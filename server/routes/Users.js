import express from "express";
import { getUser } from "../controllers/Users.js";

const Router = express.Router()

Router.post("/find/:id", getUser )

export default Router