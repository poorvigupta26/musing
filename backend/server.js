import app from "./app.js";
import mongoDB from "./data/database.js";

mongoDB();
app.listen(process.env.PORT, ()=>{
    console.log("server is running!");
})