const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//Conecct to DB
mongoose.connect(process.env.DB_CONNTECT,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true},
    () => console.log('connected to DB'));

//Middleware
app.use(express.json());

app.use('/blog/users', require('./routes/users'));
app.use('/blog/auth', require('./routes/auth'));
app.use('/blog/posts', require('./routes/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port${PORT}`));