const AppError = require('./../utils/appError');



const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);
    const message = `Account with this ${value} already exist Please try using Different`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.error).map(el => el.message);
    const message = `Invalid Input Data.${errors.join('. ')} `;
    return new AppError(message, 400);
};

const handleJwtError = err => new AppError('Invalid Token. Please Login Again ! ', 401);

const handleJWTExpiredError = err => new AppError('JWT Expired. Please Login Again', 401);

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
const sendErrorProd = (err, res) => {
    //isOperational Error trusted Error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,

        });
    } //Programming Error That dont leake error detail 
    else {

        console.error('ERRORRRRRRRRRRRRRRr', err)

        res.status(500).json({
            status: 'Fail',
            message: 'Something went very wrong'
        });
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);


    } else if (process.env.NODE_ENV === 'production') {
        // let error = {
        //     ...err
        // };
        if (err.name === 'CastError') err = handleCastErrorDB(err);
        if (err.code === 11000) err = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError') err = handleValidationErrorDB(err);
        if (err.name === 'JsonWebTokenError') err = handleJwtError(err);
        if (err.name === 'TokenExpiredError') err = handleJWTExpiredError(err);
        sendErrorProd(err, res);
    }
};