# InstaApp

Application to CRUD database with node js, Express, and MongoDB.
This application use JWT to authentication and authorization.

## Table of Contents

- [InstaApp](#InstaApp)
  - [Table of Contents](#table-of-contents)
  - [Built With](#built-with)
  - [Requirements](#requirements)
  - [Setup](#setup)
  - [Setup .env example](#setup-env-example)
  - [Run the app](#run-the-app)
  - [REST API](#rest-api)
  
## Built With
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)

## Requirements
* [Node.js](https://nodejs.org/en/)
* [Postman](https://www.getpostman.com/) for testing
* [Database](https://docs.mongodb.com/)
	
## Setup
To run this project, install it locally using npm:

```
$ yarn install
```

## Setup .env example

Create .env file in your root project folder.

```env
DB_HOST = localhost
DB_USER = root
DB_PASSWORD = your_password
DB_DATABASE = your_database
PORT = 4000
BASE_URL = http://localhost:4000/
SECRET_KEY = your-secret
```
## Run the app

Development mode

```bash
$ yarn dev
```

Deploy mode

```bash
$ yarn start
```

## REST API

You can view my Postman collection [here](https://www.getpostman.com/collections/3ba10aefa9602af76287)
or </br>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3ba10aefa9602af76287)
