import express from "express";
import jwt from "jsonwebtoken";
import moment from "moment/moment.js";
import { db } from "../connect.js";

export const getNotifications = (req,res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Invalid token")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("User not logged in")

        //const q = "SELECT notifications.*, userId, username FROM notifications JOIN users ON(users.id = notifications.userId) WHERE notifications.userId = ?"
        const q = "SELECT notifications.*, username, userId FROM notifications JOIN users ON(users.id = notifications.userId) WHERE `userId` != ?"
        db.query(q, [data.id], (err, data) => {
            if (err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    })
}
export const addNotifications = (req,res) => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Invalid token")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("User not logged in")

        const q = "INSERT INTO notifications(`userId`, `postId`) VALUES (?)"

        const values = [data.id, req.body.postId]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json("Notification added")
        })
    })
}
export const deleteLikeNotifications = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("token not valid")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("token not valid")

        const q = "DELETE FROM notifications WHERE `postId` = ?"

        db.query(q, [req.query.postId], (err, data) => {
            if(err) return res.status(500).json(err)
            if(data.affectedRows>0) return res.status(200).json("Notification deleted")

            return res.status(403).json("Not working")
        })
    })
}
export const deleteNotifications = (req,res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("token not valid")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("token not valid")

        const q = "DELETE FROM notifications WHERE `id` = ?"

        db.query(q, [req.params.id], (err, data) => {
            if(err) return res.status(500).json(err)
            if(data.affectedRows>0) return res.status(200).json("Notification deleted")

            return res.status(403).json("Not working")
        })
    })
}