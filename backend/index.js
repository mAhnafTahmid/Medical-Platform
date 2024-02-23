import express from "express"
const app=express()
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose from 'mongoose'

import hospitalRouter from './routes/hospitalRoute.js';


dotenv.config();


const port = process.env.PORT || 3000;
const dbURL = process.env.mongoDBURL
// import { dbconn } from './dbconn.js' 

// middleware
app.use(express.json())
app.use(cors());

// routes
app.use('/hospital', hospitalRouter)


// server running code and a root route for checking
app.get('/*', async (req, res) => {
  res.status(200).send('medical management server is up and running')
});


mongoose
    .connect(dbURL)
    .then(() => {
        console.log('Connection to DB successful')
        app.listen(port, () => {
            console.log(`medical management started on port: ${port}`);
          });
    })
    .catch((error) => {
        console.log(error)
    })