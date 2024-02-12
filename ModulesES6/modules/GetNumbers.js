export const GetNumbers = (numbers) => {
    let mass = [];
    for (let i = 0; i < numbers; i++) {
        mass.push(i);
    }
    return mass;
};

export const SumNumbers = (numbers) => {
    const { a, b } = numbers;
    return a + b;
};
