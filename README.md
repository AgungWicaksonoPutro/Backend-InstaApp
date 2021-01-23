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
PORT = set PORT
HOST = set MongoDB
SECRET_KEY = set Secret Key
SERVICE = service for node mailer
SERVICE_MAIL = set mail
SERVICE_PASS = set pwd mail
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
