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
  read -p "$green ?$reset Do you want to insert products? $green(recommended)$reset $lightBlue[y/n]$reset: $blue" res
  echo -ne $reset

  if [ "$res" != "y" ]; then
    return 0
  fi

  if [[ "$db" == "postgres" ]]; then
    docker exec -i postgres-db psql \
      -U "$DB_USER" \
      -d "$DB_NAME" \
      < ./src/database/seeds/product_inserts_postgres.sql \
      > /dev/null 2>&1
  else
    docker exec -i mysql-db mysql \
      -h 127.0.0.1 \
      --protocol=tcp \
      -u"$DB_USER" \
      -p"$DB_PASSWORD" \
      "$DB_NAME" \
      --default-character-set=utf8mb4 \
      < ./src/database/seeds/product_inserts_mysql.sql \
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
    printf "$red ❌$reset You did not define $value...\n"
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

  if [[ "$db" == "postgres" ]]; then
    echo "DB_PORT=5432" >> .env
    echo "DB_DIALECT=postgres" >> .env
  else
    echo "DB_PORT=3306" >> .env
    echo "DB_DIALECT=mysql" >> .env
  fi

  echo "DB_HOST=db" >> .env
  echo "PORT=3000" >> .env
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
    printf "$green  ? $reset$key: $blue"
    read value
    echo -ne $reset
    
    if isNotEmpty "$value"; then
      echo -e "$key=$value" >> .env
      break
    fi

    printf "$red ❌$lightBlue Invalid value. Please try again..."
    sleep 1
    printf "\r$resetLine$cursorUp\r$resetLine"
  done
}

setupEnvVariables() {
  touch .env

  echo -e "\n  $purpleᐳ$reset I need you to define these$bold variables$reset:"

  askAndSaveEnvVariable DB_NAME
  askAndSaveEnvVariable DB_USER
  askAndSaveEnvVariable DB_PASSWORD
  askAndSaveEnvVariable DB_ROOT_PASSWORD
  askAndSaveEnvVariable JWT_SECRET

  setDefaultEnvVariables 
  
  echo ""

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
  spinner "Preparing server" &
  pid=$!

  if [[ "$db" == "postgres" ]]; then
    docker compose -f docker-compose-postgres.yml down -v --remove-orphans > /dev/null 2>&1
    docker compose -f docker-compose-postgres.yml build --no-cache > /dev/null 2>&1
    docker compose -f docker-compose-postgres.yml up -d > /dev/null 2>&1
  else
    docker compose -f docker-compose-mysql.yml down -v --remove-orphans > /dev/null 2>&1
    docker compose -f docker-compose-mysql.yml build --no-cache > /dev/null 2>&1
    docker compose -f docker-compose-mysql.yml up -d > /dev/null 2>&1
  fi

  kill $pid

  printf "\r$resetLine $green✓$lightBlue Preparing server$reset\n"
}

waitForDB() {
  spinner "Preparing database" &
  pid=$!

  if [[ "$db" == "postgres" ]]; then
    until docker exec postgres-db pg_isready \
      -h localhost \
      -p 5432 \
      -U "$DB_USER" \
      > /dev/null 2>&1; do
        sleep 2
    done
  else
    until docker exec mysql-db mysqladmin ping \
    -h localhost \
    --protocol=tcp \
    -u"$DB_USER" \
    -p"$DB_PASSWORD" \
    --silent \
    > /dev/null 2>&1; do
      sleep 2
    done
  fi

  kill $pid

  printf "\r$resetLine $green✓$lightBlue Preparing database$reset\n"
}

printSuccessMessage() {
  echo -e "$purple$bold ↳$reset$bold Server running on port:$blue $PORT$reset\n"
}

runDockerCompose() {
  spinner "Preparando server" &
  pid=$!

  if [[ "$db" == "postgres" ]]; then
    docker compose -f docker-compose-postgres.yml up -d > /dev/null 2>&1
  else
    docker compose -f docker-compose-mysql.yml up -d > /dev/null 2>&1
  fi

  kill $pid

  printf "\r$resetLine $green✓$lightBlue Preparando server$reset\n"
}

printHelp() {
  cat << EOF
 Project bootstrap script

 This script helps you configure environment variables,
 start Docker containers, prepare the database and run the server.

${bold} Usage: ./CLI.sh${reset} [OPTIONS]

${bold} Options:${reset}
${bold}   -i,--interactive${reset}
           Run interactive mode 

${bold}   -f,--full${reset}
           Run the full setup process.
           Rebuilds Docker containers, waits for the database 
           to be ready and optionally inserts initial data.

${bold}   -s,--insert${reset}
           Insert initial seed data into the database only.

${bold}   -h,--help${reset}
           Print help
EOF
}

stopDockerCompose() {
  echo ""

  if [[ "$db" == "postgres" ]]; then
    docker compose -f docker-compose-postgres.yml down 
  else
    docker compose -f docker-compose-mysql.yml down 
  fi
}

askDatabaseType() {
  while true; do
    printf "\n$bold Select a database:$reset\n\n"
    printf " $lightBlue▪$reset MySQL    $green[1]$reset\n"
    printf " $lightBlue▪$reset Postgres $green[2]$reset\n"
     
    printf "\n$green ?$reset Option: $blue"
    read option
    echo -ne $reset

    case $option in
      1)
        db="mysql"
        return 0
      ;;

      2)
        db="postgres"
        return 0
        ;;
    esac
  done
}

interactiveMode() {
  option=1

  while (( $option != 0 )); do
    clear

    printf " ┌────────────────────────────────────────────────────────┐\n"
    printf " │                         $bold MENU$reset                          │\n"
    printf " └────────────────────────────────────────────────────────┘\n\n"
    printf "  $lightBlue▪$reset$bold Full setup$reset (removes containers and inserts products) $green[1]$reset\n"
    printf "  $lightBlue▪$reset$bold Normal start$reset (keeps containers and data)             $green[2]$reset\n"
    printf "  $lightBlue▪$reset$bold Stop server and database$reset                             $green[3]$reset\n"
    printf "  $lightBlue▪$reset$bold Insert products into database$reset                        $green[4]$reset\n"
    printf "  $lightBlue▪$reset$bold Exit$reset                                                 $green[0]$reset\n\n"
     
    printf "$green  ?$reset Option: $blue"
    read option
    echo -ne $reset

    case $option in
      1)
        askDatabaseType

        if [ -f ".env" ]; then 
          validateEnvVariables
        else 
          setupEnvVariables
        fi

        loadEnv

        resetAndRunDockerCompose
        waitForDB
        runSeedInsertInteractive

        printSuccessMessage
        return 0
      ;;

      2)
        if [ -f ".env" ]; then 
          validateEnvVariables
        else 
          setupEnvVariables
        fi

        loadEnv

        runDockerCompose
        waitForDB

        printSuccessMessage
        return 0
        ;;

      3)
        stopDockerCompose
        return 0
        ;;

      4)
        loadEnv
        runSeedInsertInteractive
        return 0
        ;;
    esac
  done
}

main() {
  if [ -z "$1" ]; then
      if [ -f ".env" ]; then 
        validateEnvVariables
      else 
        setupEnvVariables
      fi

      loadEnv

      runDockerCompose
      waitForDB

      printSuccessMessage
      return 0
  fi

  case "$1" in
    -i | --interactive)
      interactiveMode
      ;;

    -f | --full)
      askDatabaseType

      if [ -f ".env" ]; then 
        validateEnvVariables
      else 
        setupEnvVariables
      fi

      loadEnv

      resetAndRunDockerCompose
      waitForDB
      runSeedInsertInteractive

      printSuccessMessage
      return 0
      ;;

    -s | --insert)
      loadEnv
      runSeedInsertInteractive
      return 0
      ;;
    
    -h | --help)
      printHelp
      return 0
      ;;

    *)
      printHelp
      return 0
      ;;
  esac
}

main "$@"
