const express = require("express");

const ctrl = require("../../controllers/books");

const { validateBody, isisValidId } = require("../../middlewares");

const { schemas } = require("../../models/book");

const router = express.Router();

router.get("/", ctrl.getAll);
router.get("/:id", isisValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);
router.put(
    "/:id",
    isisValidId,
    validateBody(schemas.addSchema),
    ctrl.updateById,
);
router.patch(
    "/:id/favorite",
    isisValidId,
    validateBody(schemas.updateFavoriteSchema),
    ctrl.updateFavorite,
);

router.delete("/:id", isisValidId, ctrl.deleteById);

module.exports = router;
