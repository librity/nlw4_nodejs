import request from "supertest";

import setupDatabaseConnection from "../../database";
import app from "../../app";

describe("Users integration test", () => {
  beforeAll(async () => {
    const connection = await setupDatabaseConnection();
    await connection.runMigrations();
  });

  it("Should create a new user", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "Example User",
    });

    expect(response.status).toBe(201);
  });

  it("Shouldn't create a user if email is taken", async () => {
    const response = await request(app).post("/users").send({
      email: "user@example.com",
      name: "Example User",
    });

    expect(response.status).toBe(400);
  });
});
