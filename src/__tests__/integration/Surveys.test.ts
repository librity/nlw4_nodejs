import request from "supertest";
import { getConnection } from "typeorm";

import setupDatabaseConnection from "../../database";
import app from "../../app";

describe("Surveys integration test", () => {
  beforeAll(async () => {
    const connection = await setupDatabaseConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should create a new survey", async () => {
    const response = await request(app).post("/surveys").send({
      title: "How would you rate your shopping experience",
      description: "from 1 to 10?",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "How would you rate your shopping experience",
      description: "from 1 to 10?",
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2);
  });
});
