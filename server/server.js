require('dotenv').config();
const express = require("express")
const app = express();
const cors = require("cors");
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');


const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, //access-control-allow-credentials:true
}
//tackling cors
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute)
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);  //admin route
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send("API is running....");
});
const Port = 5000;

connectDB().then(()=>{
    app.listen(Port, ()=>{
        console.log(`Server is Running on Port ${Port}`);
    });
}
)
