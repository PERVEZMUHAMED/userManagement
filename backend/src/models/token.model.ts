import { Schema, Types, model } from "mongoose";
import Token from "./Interface/token.model.interface";
const objectId= Types.ObjectId;

const tokenSchema = new Schema({
    user_id:{
        type: objectId,
        ref:"users"
    },
    token:{
        type:String,
        required:true
    },
    expireAt:{
        type:Date,
        default:Date.now,
        index:{
        expires:"15m"
        // 86400000
        }
    }
});

export default model<Token>("tokens",tokenSchema);