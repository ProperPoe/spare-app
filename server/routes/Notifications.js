import express from "express";
import { getNotifications, addNotifications, deleteLikeNotifications, deleteNotifications } from "../controllers/Notifications.js";

const Router = express.Router()

Router.get("/", getNotifications )
Router.post("/", addNotifications )
Router.delete("/", deleteLikeNotifications )
Router.delete("/:id", deleteNotifications )

export default Router