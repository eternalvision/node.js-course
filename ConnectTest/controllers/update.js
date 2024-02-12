module.exports = async (Cat, data, ResponseHandler, res, id) => {
    try {
        const result = await Cat.updateOne({ _id: id }, { $set: data });
        // 1
        if (result.mathedCount !== 0) {
            ResponseHandler(res, "text/plain", 200, "Updated");
        }
    } catch (error) {
        console.error(error);
        ResponseHandler(res, "text/plain", 500, error);
    }
};
