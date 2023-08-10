module.exports = function (err, _req, res, _next) {
  return res.status(500).send({
    success: false,
    status: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    type: err.type,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
