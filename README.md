<h1 align="center">
<img src="./assets/logo.png" alt="Project logo" width="300">
  <br>
  StockManager API
</h1>

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![ShellScript](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](#) <br>
![GitHub last commit](https://img.shields.io/github/last-commit/DarlanLS2/product-inventory-api)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/DarlanLS2/product-inventory-api)

</div>
<div align="center">

**StockManager** is a REST API for product inventory management.

The application allows users to create, update, delete, and retrieve products, <br>
as well as manage the available stock quantity.

The project was developed using TypeScript, structured with a layered architecture, <br>
and includes JWT-based authentication, standardized HTTP responses, Docker containerization, <br>
and a Shell script CLI to assist with environment setup and execution.

</div>

<details>
<summary><strong>Table of Contents 📜</strong></summary>

- [Demo 🎬](#demo-)
- [Features ✨](#features-)
- [Getting Started 🌱](#getting-started-)
  - [Prerequisites 📃](#prerequisites-)
  - [Installation 📥](#installation-)
- [Usage 🧭](#usage-)
  - [Full Setup 🚀](#full-setup-)
  - [Interactive Mode 📋](#interactive-mode-)
  - [Help 📖](#help-)
- [Built With 🔧](#built-with-)

</details>

## Demo 🎬

<div align="center">

![Running gif](./assets/running.gif)

</div>

## Features ✨

### API
* Product creation
* Product update
* Product deletion
* Retrieve a single product and list all products
* Stock quantity management
* User registration and authentication

### Security and Validation
* JWT-based authentication
* Data validation through domain entities
* Standardized HTTP responses
* Unit testing with Jest

### Infrastructure
* Full containerization with Docker
* API and database orchestration using Docker Compose
* Shell script CLI for environment setup

## Getting Started 🌱

Follow the steps below to run the project locally.

### Prerequisites 📃

Before you begin, make sure you have:

- **A Unix-like operating system** (Linux or macOS)
- **Docker** (with Docker Compose support))

To verify your installation, run:

```bash
docker --version
docker compose version
```
If Docker is not installed, follow the official installation guide [here](https://docs.docker.com/engine/install).

### Installation 📥
1. Clone the repository:
```bash
git clone https://github.com/DarlanLS2/stock-manager-api
```
2. Navigate to the project directory:
```bash
cd stock-manager-api
```
3. Make the CLI executable (if necessary):
```bash
chmod +x CLI.sh
```
4. Run the CLI:
```bash
./CLI.sh -f
```

The CLI will:
* Validate required environment variables
* Start the containers using Docker Compose
* Run the initial database seed

## Usage 🧭

### Full Setup 🚀

Rebuild containers from scratch and prepare everything:

```bash
./CLI.sh --full
```

This will:

* Remove existing containers and volumes
* Rebuild images
* Start the services
* Wait for database readiness
* Optionally insert initial data

### Interactive Mode 📋

Launch the interactive menu:

```bash
./CLI.sh --interactive
```

Available options:

* Full setup (rebuild containers and optionally insert seed data)
* Normal start (keep existing containers and data)
* Stop server and database
* Insert products into the database


### Help 📖

Display available options:

```bash
./CLI.sh --help
```

## Built With 🔧

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](#)
[![Shell Script](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)](#)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](#)
[![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#)
[![Node JS](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](#) <br>
[![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)](#)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](#)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](#)
[![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)](#)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](#)
[![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](#)
