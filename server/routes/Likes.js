import express from "express";
import { getLikes, addLikes, deleteLikes } from "../controllers/Likes.js"

const Router = express.Router()

Router.get("/", getLikes)
Router.post("/", addLikes)
Router.delete("/", deleteLikes)


export default Router