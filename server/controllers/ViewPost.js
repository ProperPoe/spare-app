import express from "express";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";

export const getViewPost = (req, res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged in foo!")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("Token not valid bitch!")

        const q = "SELECT * FROM posts WHERE `id`= ? AND `userId` = ?"

        db.query(q, [req.params.id, data.id], (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    })
    
    
}

export const updateViewPost = (req, res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged in foo!")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("Token not valid bitch!")

        const q = "INSERT INTO posts (`desc`, `createdAt`, `userId`) VALUE (?)"

        const values = [req.body.desc, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), data.id]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json("Post has been created")
        })
    })
}

export const deleteViewPost = (req, res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged in foo!")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("Token not valid bitch!")

        const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?"


        db.query(q, [req.params.id, data.id], (err, data) => {
            if(err) return res.status(500).json(err)
            if(data.affectedRows>0) return res.status(200).json("Post has been deleted")

            return res.status(403).json("You can only delete your post")
        })
    })
}

export const updatePosts = (req, res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged in foo!")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("Token not valid bitch!")

        const q = "UPDATE posts SET `desc`=? WHERE `id`=?"


        db.query(q, [req.body.desc, req.params.id], (err, data) => {
            if(err) return res.status(500).json(err)
            if(data.affectedRows>0) return res.status(200).json("Post has been deleted")

            return res.status(403).json("You can only delete your post")
        })
    })
}