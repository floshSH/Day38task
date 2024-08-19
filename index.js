import express from 'express';
import cors from 'cors';
import router from './Routers/Booking.router.js';


const app=express();
const port=4000;
app.use(cors());
app.use(express.json());    

app.get("/",(req,res)=>{
    res.status(200).send("App is running");

})

app.use("/hotel",router);

app.listen(4000, ()=>{
    console.log("Server is running on port 4000");
})
