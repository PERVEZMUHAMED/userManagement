

export default interface User extends Document {
    _id:string
    userName:string
    email:string
    password:string
    isVerified:boolean
    role:string
}