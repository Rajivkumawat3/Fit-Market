const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser=require("cookie-parser")
const bodyParser=require("body-parser")
const fileupload=require("express-fileupload")
const dotenv=require("dotenv")
const path=require("path");
const cors = require('cors');

   dotenv.config()




   app.use(
      cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );

    app.use(cookieParser())
    
app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))

app.use(fileupload())


//Route imports
const product=require("./routes/productRoute")
const user=require("./routes/userRoute")
const order=require("./routes/orderRoute")
const payment=require("./routes/paymentRoute")

app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)

// app.use(express.static(path.join(__dirname,"../frontend/build")))
// app.get("*",(req,res)=>{
//      res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
// })
// middleware for errors 
app.use(errorMiddleware);

module.exports = app;