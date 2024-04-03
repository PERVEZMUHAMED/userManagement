import { Document, Model, UpdateWriteOpResult } from "mongoose";

export default interface IUserRepository {
    create:<T>(args:T, model:Model<T>)=>Promise<T>
    Find: <T>(model: Model<T>) => Promise<T[]>
    FindOne: <T>(args:Record<string, unknown>, model: Model<T>) => Promise<T | null>
    FindById: <T>(id:string, model: Model<T>) => Promise<T | null>
    Save: (args:any)=>Promise<void>
    UpdateOne: <T>(filter: Record<string, unknown>, updateData: Record<string, unknown>, model: Model<T>) => Promise<UpdateWriteOpResult>
}