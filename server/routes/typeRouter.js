const Router = require("express");
const typeController = require("../controllers/typeController");
const router = new Router();
const checkRole = require("../middleware/CheckRole");

router.post("/", checkRole("ADMIN"), typeController.create);
router.get("/", typeController.getAll);
router.delete("/", checkRole("ADMIN"), typeController.terminate);

module.exports = router;
