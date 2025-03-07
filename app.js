const express= require('express')
const morgan = require('morgan')
const cors = require("cors");
const bodyParser = require('body-parser');
const authRoutere=require('./routes/auth')
const postRouter=require('./routes/post')

const app =express()
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use('/api/auth',authRoutere)
app.use('/api/post',postRouter)




module.exports=app