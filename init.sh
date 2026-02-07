# ANSI variables
blue=$'\033[038;5;117m'
green=$'\033[038;5;156m'
purple=$'\033[038;5;176m'
lightBlue=$'\033[038;5;60m'
orange=$'\033[38;5;214m'
red=$'\033[038;5;124m'
bold=$'\033[1m'
cursorUp=$'\033[A'
resetLine=$'\033[K'
reset=$'\033[0m'


loadEnv() {
  set -a
  source .env
  set +a
}

runSeedInsertInteractive() {
  read -p "$green ?$reset Quer fazer o insert de produtos? $green(recomendado)$reset $lightBlue[y/n]$reset: $blue" res
  echo -ne $reset

  if [ "$res" = "y" ]; then
    docker exec -i mysql-db mysql \
      -h 127.0.0.1 \
      --protocol=tcp \
      -u"$DB_USER" \
      -p"$DB_PASSWORD" \
      "$DB_NAME" \
      --default-character-set=utf8mb4 \
      < ./src/database/seeds/product_inserts.sql \
      > /dev/null 2>&1
  fi
}

isNotEmpty() {
  local value="$1"

  [[ -n "$value" ]]
}

ensureEnvVariable () {
  local key="$1"
  local value="${!key}"

  if ! isNotEmpty $value; then
    printf "$red ❌$reset Você não definiu $value...\n"
    sleep 1
    printf "\r$cursorUp$resetLine"
    askAndSaveEnvVariable $key
  fi
}

setDefaultEnvVariables() {
  sed -i "/^DB_HOST/d" .env
  sed -i "/^DB_PORT/d" .env
  sed -i "/^PORT/d" .env
  sed -i "/^DB_DIALECT/d" .env

  echo "DB_HOST=db" >> .env
  echo "DB_PORT=3306" >> .env
  echo "PORT=3000" >> .env
  echo "DB_DIALECT=mysql" >> .env
}

validateEnvVariables() {
  loadEnv

  echo ""
  ensureEnvVariable DB_NAME
  ensureEnvVariable DB_USER
  ensureEnvVariable DB_PASSWORD
  ensureEnvVariable DB_ROOT_PASSWORD
  ensureEnvVariable JWT_SECRET
  setDefaultEnvVariables
}


askAndSaveEnvVariable() {
  local key="$1"
  
  while true; do
    printf "$green ? $reset$key: $blue"
    read value
    echo -ne $reset
    
    if isNotEmpty "$value"; then
      echo -e "$key=$value" >> .env
      break
    fi

    printf "$red ❌$lightBlue Valor invalido. Digite novamente..."
    sleep 1
    printf "\r$resetLine$cursorUp\r$resetLine"
  done
}

setupEnvVariables() {
  touch .env

  echo -e "\n $purpleᐳ$reset Preciso que você defina essas$bold variaveis$reset:"

  askAndSaveEnvVariable DB_NAME
  askAndSaveEnvVariable DB_USER
  askAndSaveEnvVariable DB_PASSWORD
  askAndSaveEnvVariable DB_ROOT_PASSWORD
  askAndSaveEnvVariable JWT_SECRET

  echo "DB_HOST=db" >> .env
  echo "DB_PORT=3306" >> .env
  echo "PORT=3000" >> .env
  echo "DB_DIALECT=mysql" >> .env

  loadEnv 
}

spinner() {
  # CHARS=("⠖" "⠲" "⠴" "⠦")
  CHARS=(
    "◜"
    "◟"
    "◞"
    "◝"
  )

  while true; do
    for c in "${CHARS[@]}"; do
      printf "\r\033[2K"
      printf "$blue$bold $c \033[0m$1"
      sleep .1
    done
    printf "\r\033[2K"
  done
}

resetAndRunDockerCompose() {
  # printf " $orange…$lightBlue Preparando server$reset"
  spinner "Preparando server" &
  pid=$!

  docker compose down -v --remove-orphans > /dev/null 2>&1
  docker compose build --no-cache > /dev/null 2>&1
  docker compose up -d > /dev/null 2>&1

  kill $pid

  printf "\r$resetLine $green✓$lightBlue Preparando server$reset\n"
}

waitForDB() {
  # printf " $orange…$lightBlue Preparando banco$reset"
  spinner "Preparando banco" &
  pid=$!

  until docker exec mysql-db mysqladmin ping \
  -h localhost \
  --protocol=tcp \
  -u"$DB_USER" \
  -p"$DB_PASSWORD" \
  --silent \
  > /dev/null 2>&1; do
    sleep 2
  done

  kill $pid

  printf "\r$resetLine $green✓$lightBlue Preparando banco$reset\n"
}

printSuccessMessage() {
  echo -e "$purple$bold ↳$reset$bold Server rodando na porta:$blue 3000$reset\n"
}

runDockerCompose() {
  spinner "Preparando server" &
  pid=$!

  docker compose up -d > /dev/null 2>&1

  kill $pid

  printf "\r$resetLine $green✓$lightBlue Preparando server$reset\n"
}

printHelp() {
  cat << EOF
 Project bootstrap script

 This script helps you configure environment variables,
 start Docker containers, prepare the database and run the server.

${bold} Usage: ./init.sh${reset} [OPTIONS]

${bold} Options:${reset}
${bold}   --first${reset}
           Run the full setup process.
           Rebuilds Docker containers, waits for the database 
           to be ready and optionally inserts initial data.

${bold}   --insert${reset}
           Insert initial seed data into the database only.

${bold}   --help${reset}
           Print help
EOF
}

main() {
  case "$1" in
    --insert)
      loadEnv
      runSeedInsertInteractive
      return 0
      ;;
    
    --help)
      printHelp
      return 0
      ;;
  esac

  clear

  if [ -f ".env" ]; then 
    validateEnvVariables
  else 
    setupEnvVariables
  fi

  loadEnv

  if [ "$1" = "--first" ]; then
    resetAndRunDockerCompose
    waitForDB
    runSeedInsertInteractive
  else
    runDockerCompose
    waitForDB
  fi

  printSuccessMessage
}

main "$@"
