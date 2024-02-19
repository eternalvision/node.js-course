module.exports = async (app, Account, RegisterValidation) => {
    app.post("/accounts", async (req, res) => {
        const { error } = RegisterValidation(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        try {
            const newAccount = new Account(req.body);
            await newAccount.save();
            res.status(201).send(newAccount);
        } catch (error) {
            res.status(400).send(error);
        }
    });

    app.get("/accounts", async (req, res) => {
        try {
            const accounts = await Account.find({});
            res.status(201).send(accounts);
        } catch (error) {
            res.status(400).send(error);
        }
    });
    app.put("/accounts/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const account = await Account.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!account) {
                res.status(404).send();
            }
            res.status(200).send(account);
        } catch (error) {
            res.status(400).send(error);
        }
    });
    app.delete("/accounts/:id", async (req, res) => {
        try {
            const { id } = req.params;
            const account = await Account.findByIdAndDelete(id);
            if (!account) {
                res.status(404).send();
            }
            res.send(account);
        } catch (error) {
            res.status(500).send(error);
        }
    });
};
