const {
  register,
  authenticate,
  logout,
  refreshAuthToken,
} = require("../controllers/authController");
const router = require("express").Router();

router
  .post("/signup", register)
  .post("/signin", authenticate)
  .post("/signout", logout)
  .post("/refresh", refreshAuthToken);

module.exports = router;
