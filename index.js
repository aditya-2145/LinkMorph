const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const{connectMongoDB} = require("./connections")
const {checkforAuthentication,restrictToUser}= require("./middlewares/auth")
const app = express();
const PORT =8001;


const URLrouter= require("./routes/url");
const staticRouter = require("./routes/staticroutes");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkforAuthentication);

connectMongoDB("mongodb://localhost:27017/Short_url").then(()=>console.log("MongDB connected"));



app.use("/url",restrictToUser(["NORMAL"]), URLrouter);

app.use("/user", userRouter);
app.use("/", staticRouter);

app.listen(PORT, ()=>console.log(`Server Started at PORT:${PORT}`));

