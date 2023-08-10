const request = require("supertest");
const app = require("../../server");
const Task = require("../../models/tasksModel");
const jwt = require("jsonwebtoken");

let testTask;
let accessToken;

beforeAll(async () => {
  accessToken = jwt.sign(
    { id: "64d3d23c886131f051ceaab1", username: "test.user@email.com" },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  testTask = new Task({
    title: "My test task",
    status: "incomplete",
    userId: "64d3d23c886131f051ceaab1",
  });
  await testTask.save();
});

describe("Tasks Controller", () => {
  describe("POST /api/tasks", () => {
    it("should add a new task", async () => {
      const response = await request(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          task: {
            title: "My test task 2",
            status: "incomplete",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.task).toBeDefined();
    });
  });

  describe("GET /api/tasks", () => {
    it("should fetch tasks", async () => {
      const response = await request(app)
        .get("/api/tasks")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.tasks).toBeDefined();
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update a task", async () => {
      const response = await request(app)
        .put(`/api/tasks/${testTask._id}`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          task: {
            title: "My test task is updated",
            status: "completed",
            userId: "64d3d23c886131f051ceaab1",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Task updated successfully");
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete a task", async () => {
      const response = await request(app)
        .delete(`/api/tasks/${testTask._id}`)
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Task deleted successfully");
      expect(response.body.deleted).toBeDefined();
    });
  });
});
