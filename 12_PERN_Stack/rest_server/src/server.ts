import express from 'express';
import productsRouter from './router';
import colors from 'colors';
import db from './config/db';

//Conectar a la base de datos
async function connectDB() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        db.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.log(colors.bgWhite.red('Unable to connect to the database:'+JSON.stringify( error)));
    }
}
connectDB();
const server = express();
server.use("/api/product56s", productsRouter);
export default server;

