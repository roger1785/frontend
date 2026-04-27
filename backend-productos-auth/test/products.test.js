import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import bcrypt from "bcryptjs";

import Product from "../models/Product.js";
import User from "../models/User.js";

describe("Products endpoint", function () {
  this.timeout(10000);

  beforeEach(async function () {
    await User.deleteMany({});

    const hash = await bcrypt.hash("123456", 10);

    const user = await User.create({
      email: "test@example.com",
      password: hash,
    });

    await Product.deleteMany({});

    await Product.create({
      name: "Mouse",
      price: 80,
      stock: 10,
    });
  });

  it("debería tener un status 200 y un array", async function () {
    const res = await request(app).get("/products");

    // console.log(res.status, res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
  });

  // should return products with populated category
  it("Debería popular la categoría en el producto", async function () {
    const res = await request(app).get("/products");

    // console.log(res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(1);
  });

  it("El primer producto tiene que tener nombre", async function () {
    const res = await request(app).get("/products");

    expect(res.body[0]).to.have.property("name");
  });

  it("Debería crear un producto", async function () {
    // Login para obtener el token
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    // console.log(login.status, login.body.token);

    // Creamos el body
    const newProduct = {
      name: "Notebook",
      price: 1000,
      stock: 5,
    };

    // Hacemos la petición con el body y el Header Authorization
    const res = await request(app)
      .post("/products")
      .send(newProduct)
      .set("Authorization", "Bearer " + login.body.token);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("name");
    expect(res.body.name).to.equal("Notebook");
  });

  it("Debería retornar 401 al crear producto sin token", async function () {
    const res = await request(app).post("/products").send({
      name: "Notebook",
      price: 1000,
      stock: 5,
    });

    expect(res.status).to.equal(401);
  });

  it("Debería retornar 401 al crear producto con token inválido", async function () {
    const res = await request(app)
      .post("/products")
      .send({
        name: "Notebook",
        price: 1000,
        stock: 5,
      })
      .set("Authorization", "Bearer invalid.token.value");

    expect(res.status).to.equal(401);
  });

  it("Debería traer un producto por el id", async function () {
    const product = await Product.findOne();

    const res = await request(app).get(`/products/${product.id}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("name");
    expect(res.body.name).to.equal("Mouse");
  });

  it("Debería retornar un error 400 porque el id no es valido", async function () {
    const res = await request(app).get("/products/123");

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 404 si no encuentra un producto por el id", async function () {
    const res = await request(app).get("/products/69b000000000000000000000");

    expect(res.status).to.equal(404);
  });

  it("Debería devolver 422 si falta el nombre", async function () {
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const newProduct = {
      price: 100,
      stock: 5,
    };

    const res = await request(app)
      .post("/products")
      .send(newProduct)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).to.equal(422);
  });

  it("Debería actualizar un producto", async function () {
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const product = await Product.findOne();

    const updateProduct = {
      name: "Mouse Gammer",
    };

    const res = await request(app)
      .put(`/products/${product.id}`)
      .send(updateProduct)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal("Mouse Gammer");
  });

  it("Debería retornar 401 al actualizar un producto sin token", async function () {
    const product = await Product.findOne();

    const res = await request(app).put(`/products/${product.id}`).send({
      name: "Mouse Pro",
    });

    expect(res.status).to.equal(401);
  });

  it("Debería retornar 400 al actualizar un producto con id inválido", async function () {
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app)
      .put("/products/123")
      .send({ name: "Mouse Pro" })
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 404 al actualizar un producto inexistente", async function () {
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app)
      .put("/products/69b000000000000000000000")
      .send({ name: "Mouse Pro" })
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).to.equal(404);
  });

  it("Debería borra un producto", async function () {
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const product = await Product.findOne();

    const res = await request(app)
      .delete(`/products/${product.id}`)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).to.equal(204);
  });

  it("Debería retornar 401 al borrar un producto sin token", async function () {
    const product = await Product.findOne();

    const res = await request(app).delete(`/products/${product.id}`);

    expect(res.status).to.equal(401);
  });

  it("Debería retornar 400 al borrar un producto con id inválido", async function () {
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app)
      .delete("/products/123")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).to.equal(400);
  });

  it("Debería retornar 404 al borrar un producto inexistente", async function () {
    const login = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "123456",
    });

    const res = await request(app)
      .delete("/products/69b000000000000000000000")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(res.status).to.equal(404);
  });
});
