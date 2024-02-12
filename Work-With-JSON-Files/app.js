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

// BooksAction({ action: "read" });
// BooksAction({ action: "add", title: "Test 2", author: "Name 2" });
// BooksAction({ action: "getById", id: "ead567d0-b566-11ee-bf9a-4d4a92839b8c" });
// BooksAction({
//     action: "updateById",
//     id: "ead567d0-b566-11ee-bf9a-4d4a92839b8c",
//     title: "New Title",
//     author: "New Name",
// });
// BooksAction({ action: "deleteById", id: "sdfdfg3535jgpsdojgioe5r9" });
