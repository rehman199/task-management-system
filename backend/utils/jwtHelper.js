const jwt = require("jsonwebtoken");

const decodedUser = (token) => {
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return { id: user.id, username: user.username };
  } catch (err) {
    return null;
  }
};

module.exports = { decodedUser };
