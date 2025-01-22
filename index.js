const express=require('express');
const mongooes=require('mongoose');
const cors=require('cors');
const connectDB=require('./config/db');
require('dotenv').config;
const cookieParser = require('cookie-parser');
const Skillschema=require('./models/Skill');
const Sessionschema=require('./models/Session');
const Userschema=require('./models/User');
const errorHandler=require('./middelwares/errrorhandel');
const authRoutes= require('./routes/authRoute');
const skillRoutes=require('./routes/skills');
const userRoutes=require('./routes/user');
const sessionRoutes=require('./routes/sessions');
const app=express();




app.use(cors());
app.use(express.json());

app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/user' ,userRoutes);
app.use('/api/sessions',sessionRoutes);




// here to handel all errors 
app.use(errorHandler);

connectDB();
const Port =process.env.PORT||500;






app.listen(Port , ()=>{
console.log((Port));

    console.log(' الخادم يعمل  بنجاح');
})