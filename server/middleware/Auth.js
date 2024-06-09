const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  console.log(req.headers.authorization, "0000");

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "bearer token is not provided" });
    }
    const decodedInfo = jwt.verify(token, process.env.SECRET_KEY);
    console.log("🚀 ~ decodedInfo:", decodedInfo);
    req.user = decodedInfo;
    next();
  } catch (error) {
    res.status(401).json({ message: "user is not authenticated", error });
  }
};
