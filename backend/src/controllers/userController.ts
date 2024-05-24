import { inject, injectable } from "inversify";
import IUserController from "./Interface/userController.interface";
import IUserService from "../service/Interface/user.service.interface";
import { TYPES } from "../di/TYPES";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/Errorhandler";
import userModel from "../models/user.model";
import { sendEmail } from "../utils/email";
import { randomBytes } from "crypto";
import tokenModel from "../models/token.model";
import User from "../models/Interface/user.model.interface";

@injectable()
export default class UserController implements IUserController {
    private userService:IUserService;
    constructor(
        @inject(TYPES.UserService) private _userService:IUserService
    ) {
        this.userService = _userService;
    }
    // Register User - /api/signUp
    public register = async(req:Request, res:Response, next:NextFunction):Promise<void>=>{
        const {userName, email, password}:User = req.body;
        if(!userName|| !email|| !password) {
            return next(new ErrorHandler("Please filled all the fileds", 400))
        }
        try {
            const existUser = await this.userService.existUser({userName:userName}, userModel);
            if(existUser) return  next(new ErrorHandler("User already Exists.Try with another userName.", 400));
            const existEmail = await this.userService.existEmail({ email: email}, userModel);
            if (existEmail) return next(new ErrorHandler("Email already Exists.Try with another Email.", 400));
            const createuser = await this.userService.createUser({...req.body}, userModel);
            if(!createuser) throw next(new ErrorHandler("User not created", 400));
            const setToken = new tokenModel({
                user_id: createuser._id,
                token: randomBytes(20).toString('hex')
                })
            const createtoken = await this.userService.createToken(setToken,tokenModel);
            console.log(createtoken);
            if(createtoken) {
                const mail = await sendEmail({
                    id:createuser._id,
                    email:email,
                    userName:userName,
                    token:createtoken.token
                });                
            }
            res.status(200).json({
                success:true,
                message: `A verification email has been sent to ${email}. It will be expire after 15 minutes. If you not get verification Email click on resend token.`,
                data:createuser
            })
        } catch (error) {
            next (error);
        }
    }
    // confirmEmail - /api/confirm-email/:id/:token
    public confirmEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = await this.userService.existToken({token:req.params.token}, tokenModel);
            console.log(req.params);          
            console.log(token);            
            if(!token) return next(new ErrorHandler("Your email  verification link may have expired. Please click on resend to verify your email", 400));
            const user = await this.userService.existUser({_id:req.params.id}, userModel);
            if (!user) {
                return next(new ErrorHandler("We are unable to find a user for this verification. Please, signUp!.", 400));
            } else if(user.isVerified) {
                res.status(200).json({
                     success: true,
                    message: "User has been Already Verified.Please login",
                })
            } else { 
                const updateUser = await this.userService.updateOne({_id:user._id},{$set:{isVerified:true}}, userModel)
                if(!updateUser) return next(new ErrorHandler("User Verifed is not updated",400));
                res.status(200).json({
                    success:true,
                    message:"Your Account has been Successfully Verified"
                })    
            }
        } catch (error) {
            next(error);
        }
    }
    // resendlink - /api/resendlink
    public resendlink = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.userService.existEmail(req.body.email, userModel);
            if (!user) return next(new ErrorHandler("We were unable to find a user with that email. Make sure your Email is correct!", 401));
            if(user.isVerified) {
                res.status(200).json({
                    message:"This account has been already verified. Please log in"
                });
            };
            const {_id, userName, email} = user;
            const setToken = new tokenModel({
                user_id:_id,
                token: randomBytes(20).toString('hex')
            })
            const createtoken = await this.userService.createToken(setToken, tokenModel);
            console.log(createtoken);
            if (createtoken) {
                const mail = await sendEmail({
                    id: _id,
                    email: email,
                    userName: userName,
                    token: createtoken.token
                });
            }
            res.status(200).json({
                success: true,
                message: `A verification email has been sent to ${email}. It will be expire after 15 minutes. If you not get verification Email click on resend token.`,
            })
        } catch (error) {
            next(error);
        }
    }
    // Login - /api/login
    public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter email and password", 400))
        }
        try {
            const user = await this.userService.existEmail({email:email}, userModel);
            if(!user) return next(new ErrorHandler("email or password Ivalid", 400));
            const validPw = await this.userService.validPassword(password, user.password);
            if (!validPw) return next(new ErrorHandler("email or password Ivalid", 400));
            if(!user.isVerified) return next(new ErrorHandler("Your email has not been verified. Please click the resend", 401));
            const token = this.userService.generateToken(user);
            if(!token) return next(new ErrorHandler("Token is not generated", 400));
            res.cookie("access_token", token, {expires: new Date(Date.now() +
            (process.env.COOKIE_EXPIRES_TIME as any) * 24 * 60 * 60 * 1000), httpOnly: true})
            .status(200).json({
                success:true,
                message:"Login Successfully",
                token:token
            })
        } catch (error) {
            next(error);
        }
    }
    // getuserprofile - /api/profile 
    public getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        console.log((req as any).user);
        try {
            const getuser = await this.userService.getUserById((req as any).user.id, userModel);
            console.log("getuserC", getuser);
            if(!getuser) return next(new ErrorHandler("User Not Found", 401));
            res.status(200).json({
                success:true,
                message:" Retrieve the User Profile Successfully",
                getuser
            })
        } catch (error) {
            next(error);
        }
    }
    // getuserprofile - /api/admin/profile
    public getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const getallusers = await this.userService.getAllUsers(userModel);
            console.log("getuserC", getallusers);
            if (!getallusers) return next(new ErrorHandler("Users Not Found", 401));
            res.status(200).json({
                success: true,
                message: " Retrieve All the Users Profile Successfully",
                data: getallusers
            })
        } catch (error) {
            next(error);
        }
    }
}