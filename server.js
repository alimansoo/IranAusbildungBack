require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
// const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
// const mongoose = require('mongoose');
// const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/users', require('./routes/api/users'));
app.use('/tags', require('./routes/api/tags'));
app.use('/blogs', require('./routes/api/blog')); 
app.use('/ausbildungs', require('./routes/api/ausbildungs'));
app.use('/cover_letter', require('./routes/api/cover_letter'));
app.use('/comment', require('./routes/api/comment'));
app.use('/ticket', require('./routes/api/ticket'));
app.use('/feature', require('./routes/api/features'));
app.use('/consultancy', require('./routes/api/cover_letter'));

app.all('*', (req, res) => {
    res.status(404).json({ "status" : 404, "error": "404 Not Found" });
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));