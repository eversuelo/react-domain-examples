import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db';
import bodyParser from "body-parser";
import projectRoutes from './routes/projectRoutes';
dotenv.config();
connectDB();
const app= express();
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/projects', projectRoutes);
export default app;
