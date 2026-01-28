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

loadEnvVariablesToShell() {
  set -a
  source .env
  set +a
}

askAndRunSeedInsert() {
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

askFor () {
  local key="$1"
  local value="${!key}"

  if ! isNotEmpty $value; then
    printf "$red ❌$reset Você não definiu $value...\n"
    sleep 1
    printf "\r$cursorUp$resetLine"
    askAndSave $key
  fi
}

forceDefaultVariables() {
  sed -i "/^DB_HOST/d" .env
  sed -i "/^DB_PORT/d" .env
  sed -i "/^PORT/d" .env
  sed -i "/^DB_DIALECT/d" .env

  echo "DB_HOST=db" >> .env
  echo "DB_PORT=3306" >> .env
  echo "PORT=3000" >> .env
  echo "DB_DIALECT=mysql" >> .env
}

verifyVariables() {
  loadEnvVariablesToShell

  echo ""
  askFor DB_NAME
  askFor DB_USER
  askFor DB_PASSWORD
  askFor DB_ROOT_PASSWORD
  askFor JWT_SECRET
  forceDefaultVariables
}


askAndSave() {
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

askForEnvVariables() {
  touch .env

  echo -e "\n $purpleᐳ$reset Preciso que você defina essas$bold variaveis$reset:"

  askAndSave DB_NAME
  askAndSave DB_USER
  askAndSave DB_PASSWORD
  askAndSave DB_ROOT_PASSWORD
  askAndSave JWT_SECRET

  echo "DB_HOST=db" >> .env
  echo "DB_PORT=3306" >> .env
  echo "PORT=3000" >> .env
  echo "DB_DIALECT=mysql" >> .env

  loadEnvVariablesToShell 
}

resetAndRunDockerCompose() {
  printf " $orange…$lightBlue Preparando server$reset"

  docker compose down -v --remove-orphans > /dev/null 2>&1
  docker compose build --no-cache > /dev/null 2>&1
  docker compose up -d > /dev/null 2>&1

  printf "\r$resetLine $green✓$lightBlue Preparando server$reset\n"
}

waitForDB() {
  printf " $orange…$lightBlue Preparando banco$reset"

  until docker exec mysql-db mysqladmin ping \
  -h localhost \
  --protocol=tcp \
  -u"$DB_USER" \
  -p"$DB_PASSWORD" \
  --silent \
  > /dev/null 2>&1; do
    sleep 2
  done

  printf "\r$resetLine $green✓$lightBlue Preparando banco$reset\n"
}

showFinishMessage() {
  echo -e "$purple$bold ↳$reset$bold Server rodando na porta:$blue 3000$reset"
}

runDockerCompose() {
  printf " $orange…$lightBlue Preparando server$reset"

  docker compose up -d > /dev/null 2>&1

  printf "\r$resetLine $green✓$lightBlue Preparando server$reset\n"
}

main() {
  if [ "$1" = "--insert" ]; then
    loadEnvVariablesToShell 
    askAndRunSeedInsert
    return 0
  fi

  if [ -f ".env" ]; then 
    clear
    verifyVariables
  else 
    clear
    askForEnvVariables
  fi

  loadEnvVariablesToShell

  if [ "$1" = "--first" ]; then
    resetAndRunDockerCompose
    waitForDB
    askAndRunSeedInsert
    showFinishMessage
  else
    runDockerCompose
    waitForDB
    showFinishMessage
  fi
}

main "$@"
