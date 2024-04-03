import mongoose, { Connection, connect} from "mongoose";

export default class Database {
    private connection!:Connection;
    constructor() {
        this.Connect();
    }
    private Connect ():void {
        const {MONGODB_URL} = process.env;
        connect(MONGODB_URL as string)
        .then(()=>{
            console.log(`Database is connected`);
        })
        .catch(()=>{
            console.log(`Database is not connected`);
        })
    }
    public getConnection():Connection {
        return this.connection;
    }
}