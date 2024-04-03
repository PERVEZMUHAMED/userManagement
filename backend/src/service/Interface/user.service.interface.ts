import { Model, UpdateWriteOpResult } from "mongoose";
import User from "../../models/Interface/user.model.interface";
import Token from "../../models/Interface/token.model.interface";

export default interface IUserService {
    existUser: (userData: Record<string, string>, model: Model<User>) => Promise<User|null>
    existEmail: (userData: Record<string, string>, model: Model<User>) => Promise<User | null>
    createUser:(userData:User, model:Model<User>)=>Promise<User>
    createToken: (tokenData: Token, model: Model<Token>)=>Promise<Token>
    existToken: (userData: Record<string, string>, model: Model<Token>) => Promise<Token | null>
    generateToken:(userData:User)=>string
    validPassword:(password:string, hashPassword:string)=>Promise<boolean>
    updateOne: (query: Record<string, unknown>, updateData: Record<string, unknown>, model: Model<User>) => Promise<UpdateWriteOpResult>
    getAllUsers:(model:Model<User>) =>Promise<User[]>
    getUserById: (userId: string, model: Model<User>)=>Promise<User|null>
}