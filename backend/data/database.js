import mongoose from "mongoose";

const mongoDB=()=>{mongoose.connect(process.env.MONGO_URI,{
    dbName:"musing"
}).then(()=>{
    console.log("db connected");
})
.catch((e)=>{
    console.log(e);
})}

export default mongoDB;