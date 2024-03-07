import express from "express";
import { getAllUser, login, signup } from "../controllers/user-controller.js";

//use the router function of express
//we need to use middelware in app.js file to use routes
const router = express.Router();

router.get("/", getAllUser);
router.post("/signup",signup)
router.post("/login", login)

export default router;