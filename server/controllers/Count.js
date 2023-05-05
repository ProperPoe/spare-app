import express from "express";
import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getCount = (req,res) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json("not valid")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).status("not logged")

        const q = "SELECT notif.*, userId FROM notif JOIN users ON(users.id = notif.userId) WHERE `userId` != ?"

        db.query(q, [data.id], (err, data) => {
            if(err) return res.status(500).json("Not working")

            return res.status(200).json(data)
        })

    })

    
}
export const addCount = (req,res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Token not valid")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("User not logged in")

        const q = "INSERT INTO notif(`userId`, `postId`) VALUES (?)"

        const values = [data.id, req.body.postId]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json("Count added")
        })
    })
}
export const deleteLikeCount = (req,res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Token not valid")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("User not logged in")

        const q = "DELETE FROM notif WHERE `postId`=?" 

        db.query(q, [req.query.postId], (err, data) => {
            if(err) return res.status(500).json(err)
            if(data.affectedRows>0) return res.status(200).json("Count deleted")

            return res.status(403).json("Not working")
        })
    })
}
export const deleteCount = (req,res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Token not valid")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("User not logged in")

        const q = "DELETE FROM notif WHERE `postId` = ?" 

        db.query(q, [req.params.id], (err, data) => {
            if(err) return res.status(500).json(err)
            if(data.affectedRows>0) return res.status(200).json("Count deleted")

            return res.status(403).json("Not working")
        })
    })
}