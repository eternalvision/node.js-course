const fs = require("fs");

fs.stat(
    "../../../../../../../Downloads/307097177_20231231_12_MCZB.pdf",
    (err, stats) => {
        if (err) throw new Error(err);
        console.log(stats.size);
        console.log(stats.birthtime);
        console.log(stats.isDirectory());
        console.log(stats.isFile());
    },
);
