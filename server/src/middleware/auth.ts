import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { Users } from "../models/Users";
import { config } from "../config/keys";

export const auth: RequestHandler = async (req, res, next) => {
    try {
        const token: string = req.cookies.token;
        if (!token) throw new Error("Unauthenticated");
        const { username }: any = jwt.verify(token, config.JWT_SECRET);
        const user = await Users.findOne({ username });
        if (!user) throw new Error("Unauthenticated");
        res.locals.user = user;
        return next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Unauthenticated"})
    }
};






