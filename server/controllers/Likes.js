import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getLikes = (req,res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?"

    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).json("Not working")

        return res.status(200).json(data.map(like=>like.userId))
    })
}
export const addLikes = (req,res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Token not valid")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("User not logged in")

        const q = "INSERT INTO likes(`userId`, `postId`) VALUES (?)"

        const values = [data.id, req.body.postId]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json("Not working")

            return res.status(200).json("Post liked")
        })
    })
}
export const deleteLikes = (req,res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Token not valid")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("User not logged in")

        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?" 

        db.query(q, [data.id, req.query.postId], (err, data) => {
            if(err) return res.status(500).json("Not working")

            return res.status(200).json("Post unliked")
        })
    })
}