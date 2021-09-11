const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { errorMessage, statusCodes, variables: { DB_CONNECTION_URL, PORT } } = require('./config');
const { authRouter, carRouter, userRouter } = require('./routes');

const app = express();

mongoose.connect(DB_CONNECTION_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => res.json('Pong'));

app.use('/auth', authRouter);
app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, () => {
    // console.log(process.env);
    console.log('App listen', PORT);
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || statusCodes.NOT_FOUND,
        message: err.message || errorMessage.NOT_FOUND
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, next) {
    res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({
            message: err.message
        });
}
