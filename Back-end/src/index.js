// require('dotenv').config({ path:'./env' })
import dotenv from 'dotenv'
import express from "express";
import connection from "./Config/db.config.js";
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

app.listen(3000);