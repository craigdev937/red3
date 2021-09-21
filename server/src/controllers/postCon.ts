import { RequestHandler } from "express";
import { Posts } from "../models/Posts";
import { Users } from "../models/Users";


export const CreatePost: RequestHandler =
async (req, res, next) => {    
    const user: Users = res.locals.user;
    try {
        const post: Posts = new Posts();
        post.title = req.body.title;
        post.description = req.body.description;
        post.amount = req.body.amount;
        post.status = req.body.status;
        post.user = user;
        await post.save();
        return res.status(201).json(post);
    } catch (error) {        
        res.status(500).json(error);
        next(error);
    }
};






