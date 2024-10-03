const jwt = require("jsonwebtoken");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "bearer token is not provided" });
      }
      const decodedInfo = jwt.verify(token, process.env.SECRET_KEY);
      if (decodedInfo.role !== role) {
        return res.status(403).json({ message: "Has no access" });
      }
      req.user = decodedInfo;
      next();
    } catch (error) {
      res.status(401).json({ message: "user is not authenticated", error });
    }
  };
};
