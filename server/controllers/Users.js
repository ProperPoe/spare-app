export const getUser = () => {
    const token = req.cookies.accessToken

    if(!token) return res.status(401).json("Not logged in foo!")

    jwt.verify(token, "theKey", (err, data) => {
        if(err) return res.status(403).json("Token not valid bitch!")

        const q = "SELECT * FROM users"

        db.query(q, (err, data) => {
            if(err) return res.status(500).json(err)

            return res.status(200).json(data)
        })
    })
}