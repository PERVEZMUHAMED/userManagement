import App from "./app";
import Database from "./config/database";

const Application = new App();
const database = new Database();
const {PORT} = process.env;

Application.app.listen(PORT,async()=>{
   database.getConnection();
    console.log(`Server is Connected in http://localhost:${PORT}`);
})

