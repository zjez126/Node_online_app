const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    console.log(err);
    console.log(err.name);
    if (err.name == 'ValidationError') {
        const message = "最少8位密码"
        new ErrorResponse(message, 400)
    }

    if (err.code == 11000) {
        const message = "邮箱已存在"
        new ErrorResponse(message, 400)
    }
    res.status(err.statusCode || 500).json({ success: false, error: err.message || 'Server Error' });
}

module.exports = errorHandler