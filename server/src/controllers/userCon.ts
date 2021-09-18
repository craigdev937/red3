import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { config } from "../config/keys";
import { RequestHandler } from "express";
import { isEmpty, validate } from "class-validator";
import { Users } from "../models/Users";

export const Register: RequestHandler =
async (req, res, next) => {
    
    try {
        const { username, email } = req.body;
        // Validate data for errors.
        let errors: any = {};
        const emailUser = await Users.findOne({ email });
        const usernameUser = await Users.findOne({ username });
        if (emailUser) errors.email = "Email is already taken.";
        if (usernameUser) errors.username = "Username already taken";
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        };
        // Create the User.
        const user: Users = new Users();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        errors = await validate(user);
        if (errors.length > 0) return res.status(400).json({ errors });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const Login: RequestHandler = 
async (req, res, next) => {
    try {
        const { username, password } = req.body;
        let errors: any = {};
        if (isEmpty(username)) errors.username = "Username must not be empty";
        if (isEmpty(password)) errors.password = "Password must not be empty";
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        };

        const user: Users | undefined = await Users.findOne({ username });
        if (!user) return res.status(404)
            .json({ error: "User not found!" });

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401)
                .json({ password: "Password is incorrect!" });
        };

        const token: string = jwt.sign({ username }, config.JWT_SECRET);
        res.set("Set-Cookie", 
        cookie.serialize("token", token, {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,  // Age in seconds.
            path: "/",
        }));
        return res.json({ user, token });
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const Me: RequestHandler = 
(req, res, next) => {
    try {
        return res.json(res.locals.user);
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const Logout: RequestHandler = 
(req, res, next) => {
    try {
        res.set("Set-Cookie", 
        cookie.serialize("token", "", {
            httpOnly: true,
            secure: config.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        }));
        return res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json(error);
        next(error);
    }
};

export const indexHome: RequestHandler = 
(req, res) => {
    res.json({ api: "TPERN!" });
};





