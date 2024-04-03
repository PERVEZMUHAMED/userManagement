import { Request, Response, NextFunction } from "express";

export default interface IUserController {
    register:(req:Request, res:Response, next:NextFunction)=>Promise<void>
    confirmEmail: (req: Request, res: Response, next: NextFunction) => Promise<void>
    login: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getUserProfile: (req: Request, res: Response, next: NextFunction) => Promise<void>
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>
}