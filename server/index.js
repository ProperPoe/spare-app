import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/Auth.js"
import PostRoutes from "./routes/Posts.js"
import UserRoutes from "./routes/Users.js"
import LikeRoutes from "./routes/Likes.js"
import NotificationRoutes from "./routes/Notifications.js"
import CountRoutes from "./routes/Count.js"
import ViewRoutes from "./routes/ViewPost.js"

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)

    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(cookieParser())

app.use("/api/auth", AuthRoutes)
app.use("/api/posts", PostRoutes)
app.use("/api/users", UserRoutes)
app.use("/api/likes", LikeRoutes)
app.use("/api/notifications", NotificationRoutes)
app.use("/api/count", CountRoutes)
app.use("/api/view", ViewRoutes)

app.listen(9000, () => {
    console.log("listening biatchhh!")
})