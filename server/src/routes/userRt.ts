import express from "express";
import { auth } from "../middleware/auth";
import { indexHome, Login, Logout, Me, 
    Register } from "../controllers/userCon";

export const userRt: express.Router = express.Router();
    userRt.post("/register", Register);
    userRt.post("/login", Login);
    userRt.get("/me", auth, Me);
    userRt.get("/logout", Logout);
    userRt.get("/", indexHome);








