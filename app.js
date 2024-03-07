import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();

app.use(express.json()); // another middleware- app server doesnt know what type of data is it receiving from req.body, so we need to tel app.js that we are receiving the json format
// it will parse all the data to JSON format
app.use("/api/user", router); // middelware to use routes

app.use("/api/blog", blogRouter);

mongoose
  .connect(
    "mongodb+srv://admin:bU3twslxXvakLX0r@cluster0.h7wtxvv.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("connected to DB and listening on port 5000"))
  .catch((err) => console.log(err));
