const express = require("express");
const { Login } = require("./src/controllers/auth");
// const { getProduct, getAllProduct, createProduct } = require("./src/controllers/product");
const createProduct = require("./src/routes/product");
const authRouter = require("./src/routes/auth");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { connectdb } = require("./src/db.config");
// const { hashPassword } = require('./src/helpers/auth')

//dotenv config
dotenv.config();
const PORT = process.env.PORT;
const dbUrl = process.env.MONGODB_URL;

console.log("My secret pin is", dbUrl);

//connect to MongoDB
connectdb(dbUrl);

// const pwd = 'password'
// console.log('passwords', pwd)

// const hashedpwd = hashPassword(pwd)
// setTimeout(()=>{
//     console.log(hashedpwd)
// }, 5000)

// mongoose.connect(dbUrl)
// .then(()=> console.log('DB connectd sucessfully'))
// .catch((err)=> console.log('Error connecting to MongoDb', err.message))

// initialize express
const app = express();

//body PASWWE
//middleware
app.use(express.json());

// Home page
const HomeAPI = (req, res) => {
  return res.json({
    message: "Welcome to Node Js",
    control: "navigate to products to see all product",
  });
};
app.get("/", HomeAPI);

// //product route
// app.get('/product', getProduct);

// //get All product
// app.get('/products', getAllProduct);

// // login Route
// app.get('/login', Login);

//router
app.use("/api/product", createProduct);
app.use("/api/auth", authRouter);

// listen to server
// const PORT = 8080;
app.listen(PORT, () => {
  console.log("cant wait to do more on", PORT);
});

// listen to server
