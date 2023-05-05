import express from "express";
import { getViewPost, deleteViewPost, updateViewPost } from "../controllers/ViewPost.js";

const Router = express.Router()

Router.get("/:id", getViewPost )
Router.delete("/:id", deleteViewPost )
Router.put("/:id", updateViewPost )

export default Router