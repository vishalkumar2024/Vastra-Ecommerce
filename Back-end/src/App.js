import express from "express"
const app = express();
import cookieParser from "cookie-parser"
import cors from 'cors'

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))


import user from "./Routes/user.routes.js"
import product from "./Routes/product.routes.js"

app.use("/api/user", user)
app.use("/api/product", product)

export { app }