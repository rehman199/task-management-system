module.exports = {
  testEnvironment: "node",
  testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.js$",
  collectCoverage: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ["./tests/setup.js"],
};
