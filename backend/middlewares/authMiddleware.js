const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) return res.status(403).send({ error: "Access Denied." });

  const accessToken = token.split(" ")[1];
  try {
    if (jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)) next();
  } catch (err) {
    return res.status(401).send({ error: "Access Token expired" });
  }
};

module.exports = { verifyToken };
