import { Document } from "mongoose"

export default interface Token extends Document {
    _id:string
    user_id:string
    token:string
    createdAt:number
}