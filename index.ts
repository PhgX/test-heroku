import express from 'express';
import mongoose from 'mongoose';
import {loginRoutes} from './src/routes/login.router'


const PORT = 3300;
const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

const DB_URL = "mongodb://localhost:27017/Product_Management";
mongoose.connect(DB_URL)
.then(() => {console.log('DB Connected')})
.catch((err) => {console.log(err.message);
});

app.use('', loginRoutes);
app.listen(PORT, () => {console.log(`App is running on http://localhost:${PORT}`)});