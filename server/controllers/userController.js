const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");

const generateJwt = (id, email, role) =>
  jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "6h",
  });

class UserController {
  async register(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("email or password are not correct"));
    }
    if (typeof email !== "string" || typeof password !== "string") {
      return next(ApiError.badRequest("email and password must be strings"));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(
        ApiError.badRequest("user with inputted email already exists")
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = User.create({ password: hashPassword, email, role });
    const basket = Basket.create({ userId: user.id });
    const token = generateJwt(user.id, email, role);

    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("user with inputted email is not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("password is not correct"));
    }

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res) {
    const { user } = req;
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token, user });
  }
}

module.exports = new UserController();
