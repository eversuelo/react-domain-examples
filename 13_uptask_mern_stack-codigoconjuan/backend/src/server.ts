import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { corsConfig } from './config/cors';
import {connectDB} from './config/db';
import bodyParser from "body-parser";
import projectRoutes from './routes/projectRoutes';
dotenv.config();
connectDB();
const app= express();
app.use(cors(corsConfig));
// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/api/projects', projectRoutes);
export default app;
