const HttpError = (status, message) => {
    const error = new Error(message);
    error.stack = status;
    return error;
};

module.exports = HttpError;
