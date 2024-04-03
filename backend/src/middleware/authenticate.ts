import { injectable } from "inversify";
import IAuthMiddleware from "./Interface/auth.middleware.interface";
import {Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/Errorhandler";
import { verify } from "jsonwebtoken";


@injectable() 
export default class AuthMiddleware implements IAuthMiddleware {

    public authenticateUser = async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
        const token = req.cookies.access_token;
        console.log("tokenM", token);
        const { JWT_SECRET } = process.env;
        if (!token) return next(new ErrorHandler("Unauthorized User. First Login and then Handle this resources", 401));
        verify(token, JWT_SECRET as string, (err, payload)=>{
            if (err) return next(new ErrorHandler("Token or user is Invalid", 401));
            (req as any).user = payload;
            console.log((req as any).user);
            next();
        });
    }
    public authorizedRoles = (...roles:Array<string>)=>{
        return (req:Request, res:Response, next:NextFunction)=>{
            if(!roles.includes((req as any).user.role)) {
                return next(new ErrorHandler(`Role is ${(req as any).user.role} not Allowed`, 401));
            }
            next();
        }
    }
}