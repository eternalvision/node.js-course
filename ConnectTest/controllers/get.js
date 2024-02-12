module.exports = async (Cat, ResponseHandler, res) => {
    try {
        const data = await Cat.find({});
        ResponseHandler(res, "application/json", 200, JSON.stringify(data));
    } catch (error) {
        ResponseHandler(res, "text/plain", 500, error);
    }
};
