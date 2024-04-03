import express, { Application } from "express";
import {config} from "dotenv";
import { join } from "path";
config({path:join(__dirname, "config/config.env")});
import cors from "cors";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/error";
import UserRouter from "./routers/user.router";

export default class App {
    app:Application;
    constructor() {
        this.app = express();
        this.config();
        this.mountRoute();
    }
    private config() {
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(cors());
    }
    private mountRoute() {
        const UserRoute = new UserRouter();
        this.app.use("/api", UserRoute.getRouter());
        this.app.use(ErrorMiddleware.errorHandler);
    } 
}