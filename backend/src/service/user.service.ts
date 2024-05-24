import "reflect-metadata";
import { inject, injectable } from "inversify";
import User from "../models/Interface/user.model.interface";
import IUserRepository from "../repositorys/Interface/user.repository.interface";
import IUserService from "./Interface/user.service.interface";
import { TYPES } from "../di/TYPES";
import { Model } from "mongoose";
import {compare, hash} from "bcrypt";
import {sign} from "jsonwebtoken";
import Token from "../models/Interface/token.model.interface";

@injectable()
export default class UserService implements IUserService {
    private userRepo:IUserRepository;
    constructor(
        @inject(TYPES.UserRepository) private _userRepo:IUserRepository
    ) {
        this.userRepo = _userRepo;
    }

    public existUser = async (userData:Record<string, string>, model:Model<User>):Promise<User|null>=> {
        try {
            const user = await this.userRepo.FindOne(userData, model);
            return user;
        } catch (error) {
            throw error;
        }
    }
    public existEmail = async (userData: Record<string, string>, model: Model<User>):Promise<User|null> => {
        try {
            const user = await this.userRepo.FindOne(userData, model);
            return user;
        } catch (error) {
            throw error;
        }
    }
    public createUser =async(userData:User, model:Model<User>):Promise<User>=>{
        try {
            const hashpassword = await hash(userData.password, 7);
            const createuser = await this.userRepo.create({...userData, password:hashpassword}, model);     
            return createuser;
        } catch (error) {
            throw error;
        }
    }
    public createToken = async (tokenData:Token, model: Model<Token>): Promise<Token> => {
        try {
            const createtoken = await this.userRepo.create(tokenData, model);
            return createtoken;
        } catch (error) {
            throw error;
        }
    }
    public existToken = async (tokenData: Record<string, string>, model: Model<Token>): Promise<Token | null> => {
        try {
            const user = await this.userRepo.FindOne(tokenData, model);
            return user;
        } catch (error) {
            throw error;
        }
    }
    public validPassword = async(password:string, hashpassword:string):Promise<boolean>=>{
        try {
            const validPw = await compare(password, hashpassword);
            return validPw;
        } catch (error) {
            throw error;
        }
    }
    public generateToken = (userData:User):string=>{
        try {
            const {_id, email, role} = userData;
            const { JWT_SECRET, JWT_EXPIRES_TIME } = process.env;
            const token = sign({id:_id, email:email, role:role}, JWT_SECRET as string,
            {expiresIn:JWT_EXPIRES_TIME})
            return token;
        } catch (error) {
            throw error;
        }
    }
    public getUserById = async (userId:string, model:Model<User>):Promise<User|null> => {
        try {
            const getuser = await this.userRepo.FindById(userId, model);
            console.log("getUserS", getuser);
            return getuser;
        } catch (error) {
            throw error;
        }
    }
    public updateOne = async (query: Record<string, unknown>, updateData:Record<string, unknown>, model:Model<User>)=>{
        try {
            const updatedata = await this.userRepo.UpdateOne(query, updateData, model);
            return updatedata;
        } catch (error) {
            throw error;
        }
    } 
    public getAllUsers = async(model:Model<User>):Promise<Array<User>>=>{
        try {
            const getallusers = await this.userRepo.Find(model);
            return getallusers;
        } catch (error) {
            throw error;
        }
    }
}