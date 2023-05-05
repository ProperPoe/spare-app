import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ?"

    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err)

        if(data.length) return res.status(409).json("User Already Exists Bro!")

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (`email`, `username`, `password`) VALUE (?)"

        const values = [req.body.email, req.body.username, hashedPassword]

        db.query(q, [values], (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json("User is registered, boiiii!")
        })
    })
}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE email = (?)"

    db.query(q, [req.body.email], (err, data) => {
        if(err) return res.status(500).json(err)

        if(data.length === 0) return res.status(404).json("User doesnt exit man, cmonnn")

        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("Wrong password or username DUMBASS")

        const token = jwt.sign({id: data[0].id}, "theKey");

        const {password, ...others} = data[0]

        res.cookie("accessToken", token, {httpOnly: true}).status(200).json(others)
    })

}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
    
}