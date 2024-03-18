  # User Management in NodeJs with Express framework
This is an user Management API build using nodeJs with express framework.clean architecture design pattern was follwed while building this project in order to implements decoupling and separation of concerns.
# Project Overview 
# Tech Stack 
  - Node.js
  - Express Framework 
  - Mongodb 
  - Mongoose ODM
  - JWT
## Run Locally 
clone the Project
```bash
git clone https://github.com/PERVEZMUHAMED/userManagement.git
```
Go to the project directory
```bash
cd backend
```
Install Dependencies
```bash
npm install
```
start the server
```bash
npm run dev
```
## Enviroment Variables
To run this project, you will need to add the following enviroment variables to your .env file

`PORT`=`your PORT_NUMBER`  
`MONGODB_URL`=`your Database_URL`  
`JWT_SECRET`=`your JWT_SECRET_KEY`  
`JWT_EXPIRES_TIME`=`your JWT_EXPIRES_TIME`  
`COOKIE_EXPIRES_TIME`= `your COOKIE_EXPIRES_TIME`  
`SMTP_HOST`=`your SMTP_HOST`  
`SMTP_PORT`=`Your SMTP_PORT`  
`SMTP_USER`=`your SMTP_USER`  
`SMTP_PASS`=`Your SMTP_PASS`  
`SMTP_FROM_NAME`=`Your SMTP_NAME`  
`SMTP_FROM_EMAIL`=`Your SMTP_EMAIL`  
## Features
- User and Admin Authentication
- User Profile
