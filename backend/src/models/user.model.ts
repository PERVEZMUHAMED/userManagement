import { Schema, model } from "mongoose";
import { isEmail } from "validator";
import User from "./Interface/user.model.interface";

const userSchema = new Schema({
    userName:{
        type:String,
        trim:true,
        required:[true, "Please  enter the userName"],
    },
    email:{
        type:String,
        required:[true, "Please Enter email"],
        validate:[isEmail, "Please Enter valid Email Address"]
    },
    password:{
        type:String,
        trim:true,
        required:[true, "Please Enter password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user"
    },
},{timestamps:true});

export default model<User>("users", userSchema);