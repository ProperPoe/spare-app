import express from "express";
import { addPosts, getPosts, deletePosts, updatePosts } from "../controllers/Posts.js";

const Router = express.Router()

Router.get("/", getPosts )
Router.post("/", addPosts )
Router.delete("/:id", deletePosts )
Router.put("/:id", updatePosts )

export default Router