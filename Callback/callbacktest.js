const calculate = (x, y, mapMass) => {
    let mass = [];
    if (x > y) {
        throw new Error("Error, value x must be < y");
    } else {
        for (let i = x; i <= y; i++) {
            mass.push(i);
        }
    }
    mapMass(mass);
};

const mapMass = (mass) => {
    if (mass.length > 0) {
        mass.map((value) => {
            console.log(value);
        });
    }
};

calculate(35, 25, mapMass);
