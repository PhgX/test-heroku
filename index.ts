import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import {loginRoutes} from './src/routes/login.router'


// const PORT = 3300;
const PORT = process.env.PORT || 3000;
const app = express();

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.json());

// const DB_URL = "mongodb://localhost:27017/Product_Management";
const DB_URL = "mongodb+srv://PhgX:BzfS6pSUDb-G8K8@cluster0.nhnbl8o.mongodb.net/?retryWrites=true&w=majority/test"
mongoose.connect(DB_URL)
.then(() => {console.log('DB Connected')})
.catch((err) => {console.log(err.message);
});

app.use('', loginRoutes);
app.listen(PORT, () => {console.log(`App is running on http://localhost:${PORT}`)});