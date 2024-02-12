module.exports = {
    useGlobalVariable: () => {
        console.log(global.foo);
    },
    GetSumResult: () => {
        global.SumNumbers(2, 5);
    },
};
