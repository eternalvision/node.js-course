module.exports = async (Cat, data, ResponseHandler, res) => {
    try {
        const cat = new Cat(data);
        await cat.save();
        const cats = await Cat.find({});
        ResponseHandler(res, "application/json", 200, JSON.stringify(cats));
    } catch (error) {
        console.error(error);
        ResponseHandler(res, "text/plain", 500, error);
    }
};
