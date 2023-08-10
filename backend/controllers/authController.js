const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { name, username, password } = req.body.user;

    if (!name || !username || !password) {
      return res
        .status(400)
        .send({ error: "All field values must be provided." });
    }

    if (await User.findOne({ username }).exec())
      return res
        .status(403)
        .send({ error: `User with the email ${username} already exists.` });

    const user = new User({
      name,
      username,
      password: await bcrypt.hash(password, 10),
    });
    await user.save();

    return res.status(201).send({
      user: user.toObject({
        transform: (doc, ret) => {
          delete ret.password;
        },
      }),
    });
  } catch (err) {
    next(err);
  }
};

const authenticate = async (req, res, next) => {
  try {
    const { username, password } = req.body.user;

    if (!username || !password)
      return res
        .status(400)
        .send({ error: "All field values must be provided." });

    const user = await User.findOne({ username }).select("+password").exec();

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).send({ error: "User is unauthorized" });

    const accessToken = jwt.sign(
      { id: user._id, username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_DURATION }
    );
    const refreshToken = jwt.sign(
      { id: user._id, username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "14d" }
    );
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.REFRESH_COOKIE_DURATION),
        ...(process.env.NODE_ENV === "production" && {
          sameSite: "none",
          secure: true,
        }),
      })
      .header("Authorization", `Bearer ${accessToken}`)
      .send({
        user: user.toObject({
          transform: (doc, ret) => {
            delete ret.password;
          },
        }),
      });
  } catch (err) {
    next(err);
  }
};

const refreshAuthToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res
        .status(401)
        .send({ error: "Session Expired.\nPlease login again." });

    const decodedUser = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = jwt.sign(
      { id: decodedUser.id, username: decodedUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_DURATION,
      }
    );

    res.header("Authorization", `Bearer ${accessToken}`).send({ accessToken });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  if (!req.cookies?.refreshToken) return res.sendStatus(204);

  res
    .clearCookie("refreshToken", { sameSite: "none", httpOnly: true })
    .send({ message: "User logged out successfully" });
};

module.exports = { register, authenticate, refreshAuthToken, logout };
