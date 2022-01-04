import express from 'express';
const app = express();
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017')
app.use(express.json());

import {userRouter} from './routes/user.router.js'
app.use('/user',userRouter);

app.listen(3000, () => {
    console.log('App listening on Port 3000')
})