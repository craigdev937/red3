import { RequestHandler } from "express";
import { Posts } from "../models/Posts";

export const CreatePost: RequestHandler =
async (req, res, next) => {
    const { title, description, amount, status } = req.body;
    const user = res.locals.user;
    try {
        const post: Posts = new Posts({ title, description, amount, status });
        // post.title = req.body.title;
        // post.description = req.body.description;
        // post.amount = req.body.amount;
        // post.status = req.body.status;
        await post.save();
        return res.status(201).json(post);
    } catch (error) {        
        res.status(500).json(error);
        next(error);
    }
};






