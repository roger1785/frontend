import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

import bcrypt from "bcryptjs";

import User from "../models/User.js";

describe("Auth User", function () {
  this.timeout(5000);

  beforeEach(async () => {
    await User.deleteMany({});

    const hash = await bcrypt.hash("123456", 10);

    await User.create({
      email: "test@example.com",
      password: hash,
    });
  });

  it("Debería registrar un usuario", async function () {
    const res = await request(app).post("/auth/register").send({
      email: "new.user@example.com",
      password: "123456",
    });

    expect(res.status).to.equal(201);
  });

  it("Debería retornar 400 si faltan email o password en register", async function () {
    const res = await request(app).post("/auth/register").send({
      email: "",
      password: "",
    });

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 400 si el email es inválido en register", async function () {
    const res = await request(app).post("/auth/register").send({
      email: "test",
      password: "123456",
    });

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 400 si el password es corto en register", async function () {
    const res = await request(app).post("/auth/register").send({
      email: "new.user@example.com",
      password: "123",
    });

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 400 si el usuario ya existe en register", async function () {
    const res = await request(app).post("/auth/register").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).to.equal(400);
  });

  it("Debería poder obtener un token", async function () {
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

  it("Debería retornar 400 si faltan email o password en login", async function () {
    const res = await request(app).post("/auth/login").send({
      email: "",
      password: "",
    });

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 400 si el email es inválido en login", async function () {
    const res = await request(app).post("/auth/login").send({
      email: "test",
      password: "123456",
    });

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 400 si las credenciales son inválidas", async function () {
    const res = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.status).to.equal(400);
  });

  it("should return 401 if no token is provided", async function () {
    const res = await request(app).get("/auth/profile");

    expect(res.status).to.equal(401);
  });

  it("should return 401 if token format is invalid", async function () {
    const res = await request(app)
      .get("/auth/profile")
      .set("Authorization", "Token abc");

    expect(res.status).to.equal(401);
  });

  it("should return 401 if token is invalid", async function () {
    const res = await request(app)
      .get("/auth/profile")
      .set("Authorization", "Bearer invalid.token.value");

    expect(res.status).to.equal(401);
  });

  it("should return profile with valid token", async function () {
    const loginRes = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const token = loginRes.body.token;

    // console.log("Token:", token);

    const res = await request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });

  it("should return 404 if user from token no longer exists", async function () {
    const loginRes = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    await User.deleteMany({});

    const res = await request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(res.status).to.equal(404);
  });

  it("Debería retornar 404 en una ruta inexistente", async function () {
    const res = await request(app).get("/ruta-que-no-existe");

    expect(res.status).to.equal(404);
  });
});
