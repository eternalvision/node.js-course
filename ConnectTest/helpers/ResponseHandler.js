module.exports = async (res, type, code, message) => {
    res.writeHead(code, { "Content-Type": type });
    res.end(message);
};
//response - ответ
