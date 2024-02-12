const books = require("./books");

const { getAll, getById, add, updateById, deleteById } = books;

const BooksAction = async ({ action, id, title, author }) => {
    switch (action) {
        case "read":
            const allBooks = await getAll();
            return console.log(allBooks);
        case "getById":
            const oneBook = await getById(id);
            return console.log(oneBook);
        case "add":
            const newBook = await add({ title, author });
            return console.log(newBook);
        case "updateById":
            const updateBook = await updateById(id, { title, author });
            return console.log(updateBook);
        case "deleteById":
            const deleteBook = await deleteById(id);
            return console.log(deleteBook);
    }
};

// const { argv } = process;
// console.log(argv);

// const actionIndex = argv.indexOf("--action");
// if (actionIndex !== -1) {
//     const action = argv[actionIndex + 1];
//     BooksAction({ action });
// }

const getArguments = () => {
    const args = {};
    process.argv.forEach((value, index, array) => {
        if (value.startsWith("--")) {
            const nextValue = array[index + 1];
            args[value.substring(2)] = nextValue;
        }
    });
    return args;
};

const args = getArguments();

BooksAction(args);
