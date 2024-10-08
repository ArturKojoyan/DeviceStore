const Router = require("express");
const router = new Router();
const brandRouter = require("./brandRouter");
const deviceRouter = require("./deviceRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const ratingRouter = require("./ratingRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/device", deviceRouter);
router.use("/rating", ratingRouter);

module.exports = router;
