import "reflect-metadata";
import {injectable} from "inversify";
import IUserRepository from "./Interface/user.repository.interface";
import { Model, UpdateWriteOpResult } from "mongoose";

@injectable()
export default class UserRepository implements IUserRepository {

    public create = async<T>(args:T, model:Model<T>):Promise<T>=>{
        try {
            const create = await model.create(args);
            return create;
        } catch (error) {
            throw error;
        }
    }
    public Find = async<T>(model:Model<T>):Promise<T[]> =>{
        try {
            const findall = await model.find();
            return findall;
        } catch (error) {
            throw error;
        }
    }
    public FindOne = async<T>(args:Record<string, unknown>, model:Model<T>):Promise<T | null> => {
        try {
            const findone = await model.findOne(args);
            return findone;
        } catch (error) {
            throw error;
        }
    }
    public FindById = async <T>(id: string, model: Model<T>): Promise<T|null> => {
        try {
            const findbyid = await model.findById(id);
            return findbyid;
        } catch (error) {
            throw error;
        }
    }
    public UpdateOne = async<T>(filter: Record<string, unknown>, updateData: Record<string, unknown>, model: Model<T>): Promise<UpdateWriteOpResult>=>{
        try {
            const Updateone = await model.updateOne(filter,updateData);
            return Updateone;
        } catch (error) {
            throw error;
        }
    }
    public Save = async(args:any):Promise<void>=>{
        try {
            await args.save();
        } catch (error) {
            throw error;
        }
    }
}