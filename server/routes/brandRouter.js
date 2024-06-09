const Router = require("express");
const router = new Router();
const brandController = require("../controllers/brandController");
const checkRole = require("../middleware/CheckRole");

router.post("/", checkRole("ADMIN"), brandController.create);
router.get("/", brandController.getAll);
router.delete("/", checkRole("ADMIN"), brandController.terminate);

module.exports = router;
