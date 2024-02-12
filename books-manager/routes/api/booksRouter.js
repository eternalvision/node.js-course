const booksRouter = (router, books) => {
    router.get("/", async (req, res) => {
        try {
            await res.json(books);
        } catch (error) {
            console.log(error);
        }
    });

    router.get("/:id", async (req, res) => {
        try {
            const index = parseInt(req.params.id);
            await res.json(books[index]);
        } catch (error) {
            console.log(error);
        }
    });

    router.post("/", async (req, res) => {
        try {
            books.push(req.body);
            await res.json(books);
        } catch (error) {
            console.log(error);
        }
    });

    router.put("/:id", async (req, res) => {
        try {
            const index = parseInt(req.params.id);
            books[index] = req.body;
            await res.json(books);
        } catch (error) {
            console.log(error);
        }
    });

    router.delete("/:id/:delCount", async (req, res) => {
        try {
            const { id, delCount } = req.params;
            const index = parseInt(id);
            const delIndex = parseInt(delCount);
            books.splice(index, delIndex);
            await res.json(books);
        } catch (error) {
            console.log(error);
        }
    });
};

module.exports = booksRouter;
