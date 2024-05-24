# userManagement
    This is an User Mangement System web API build using NodeJs along with express FrameWork.Clean architecture design patterns was followed while building thi project in order to implements decoupling and separation of concerns.
## Project Overview 
    This system is designed to provide administrators with the ability to manage the user accouts within an organization.It offers a range of functionalities for userregistration, authentication, authroization, and profile management.    
## Tech stack
    - NodeJS
    - Express
    - MongoDB
    - JWT
## Run Locally
    Clone the project
    ```bash
    git clone https://github.com/PervezMuhamed/userManagement.git
    ```
    got to the project repository 
    ```bash
    cd backend
    ```
    install dependencies
    ```bash
    npm install
    ```
    Start the server
    ```bash
    npm run dev
    ```
## Enviroment Variables
    `PORT`=`your port number`
    MONGODB_URL= `your database url`
    JWT_SECRET= `your JWT_SECRET``
    JWT_EXPIRES_TIME= `your JWT_EXPIRES_TIME`
    `COOKIE_EXPIRES_TIME= `your COOKIE_EXPIRES_TIME`
    `SMTP_HOST`= `your smtp host name`
    `SMTP_PORT`= `your smtp port number`
    `SMTP_USER`= `your smtp user`
    `SMTP_PASS`= `your smtp pass`
    `SMTP_FROM_NAME`= `your smtp name`
    `SMTP_FROM_EMAIL`= `your smtp email`
## Features
    - User and Admin Authentication
    - User Profile
    - Email Verification
    - Change Password Forgot Password

