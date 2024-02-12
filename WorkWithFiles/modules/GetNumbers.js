export const GetNumbers = (numbers) => {
    let str = "";
    for (let i = 0; i <= numbers; i++) {
        str += `${i} `;
    }
    return str;
};
