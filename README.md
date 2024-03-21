  # User Management in NodeJs with Express framework
This is an user Management API build using Node.js along with Express framework.Clean architecture design pattern was follwed while building this project in order to implements decoupling and separation of concerns.
# Project Overview 
The User Management System is a web application designed to provide administrators with the ability to manage user accounts within an organization.It offers a range of functionalities for user registration, authentication, authorization and profile management. The system aims to streamline user management processes, enchance secirity and improve the user experience.
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
- User Registration:Allows users to register for an account by providing necessary information such as username, email and password.
- Email Verification: Implements email verification to ensure the validity of user email addresses and enhance security.
- User Authentication: Provides secure authentication mechanisms such as username/password authentication and  JWT-token-based authentication.
- User Authorization: Enables administrators to define roles and permissions for users, controlling access to different parts of the system based on their roles.
- Profile Management: Allows users to manage their profile information, including updating personal details, changing passwords and forgotPassword.
- Scalability and Performance: Designed to handle a large number of user accounts and maintain optimal performance under varying loads.
