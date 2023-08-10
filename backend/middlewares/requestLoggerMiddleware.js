function requestLogger(req, res, next) {
  const startTime = new Date();

  console.log(`[${startTime.toISOString()}] ${req.method} ${req.url}`);

  next();

  const endTime = new Date();
  const responseTime = endTime - startTime;
  console.log(
    `[${endTime.toISOString()}] ${req.method} ${req.url} - ${
      res.statusCode
    } (${responseTime}ms)`
  );
}

module.exports = requestLogger;
