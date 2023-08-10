const corsOptions = {
  origin: [process.env.NEXT_PUBLIC_BASE_URL],
  exposedHeaders: "Authorization",
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
