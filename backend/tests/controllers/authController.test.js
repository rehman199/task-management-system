const app = require("../../server");
const request = require("supertest");
const jwt = require("jsonwebtoken");

describe("Authentication Controller Unit Tests", () => {
  it("should register a new user", async () => {
    const newUser = {
      name: "Test User",
      username: "testuser@example.com",
      password: "test2password",
    };

    const response = await request(app)
      .post("/api/auth//signup")
      .send({ user: newUser });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("user");
  });

  it("should authenticate a user", async () => {
    const credentials = {
      username: "testuser@example.com",
      password: "test2password",
    };

    const response = await request(app)
      .post("/api/auth/signin")
      .send({ user: credentials });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.header).toHaveProperty("authorization");
  });

  it("should refresh authentication token", async () => {
    const refreshToken = "mockRefreshToken";
    const decodedUser = { id: "mockUserId", username: "mockUsername" };
    const accessToken = "mockAccessToken";

    jwt.verify = jest.fn().mockReturnValue(decodedUser);
    jwt.sign = jest.fn().mockReturnValue(accessToken);

    const response = await request(app)
      .post("/api/auth/refresh")
      .set("Cookie", `refreshToken=${refreshToken}`);

    expect(jwt.verify).toHaveBeenCalledWith(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: decodedUser.id, username: decodedUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_DURATION }
    );
    expect(response.header["authorization"]).toBe(`Bearer ${accessToken}`);
    expect(response.body.accessToken).toBe(accessToken);
  });

  it("should handle session expired case", async () => {
    const response = await request(app).post("/api/auth/refresh");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Session Expired.\nPlease login again.");
  });

  it("should handle no refresh token case", async () => {
    const response = await request(app).post("/api/auth/signout");
    expect(response.status).toBe(204);
  });

  it("should logout user", async () => {
    const refreshToken = "mockRefreshToken";
    const response = await request(app)
      .post("/api/auth/signout")
      .set("Cookie", `refreshToken=${refreshToken}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User logged out successfully");
  });
});
