import dotenv from 'dotenv'
import express from 'express'
import connection from "./Config/db.config.js";
import {upload} from './Middleware/multer.js'
import { app } from "./App.js"
dotenv.config({
    path:'./env'
})


connection()
    .then(() => {
        app.listen(`${process.env.PORT}`|| 8000, () => {
            console.log(`SERVER is running at port - ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log("Could not connect to mongoDB",error)
    })


app.get('/', function (req, res) {
    res.send('index');
})


app.use('/images',express.static('upload/images'))
app.post('/upload', upload.single('product'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        });
    }

    res.json({
        success: true,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    });
});
