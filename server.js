const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

//load env vars
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

//body-parser
app.use(express.json());

// static folder
app.use(express.static(path.join(__dirname,'public')))

//cors
app.use(cors());

//Routes
app.use('/api/v1/stores', require('./routes/stores'));

app.get('/api/v1/stores', (req, res) => {
  res.send('Hello');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
