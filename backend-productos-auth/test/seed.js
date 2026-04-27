import bcrypt from "bcryptjs";

import "../db.js";

import Product from "../models/Product.js";

import User from "../models/User.js";

export async function seedDatabase() {
  await User.deleteMany({});
  await Product.deleteMany({});

  const user1 = await User.create({
    email: "test@example.com",
    password: await bcrypt.hash("123456", 10),
  });

  const user2 = await User.create({
    email: "other@example.com",
    password: await bcrypt.hash("123456", 10),
  });

  await Product.insertMany([
    {
      name: "Mouse",
      price: 80,
      stock: 10,
    },
    {
      name: "Keyboard",
      price: 120,
      stock: 5,
    },

    {
      name: "Gaming Mouse",
      price: 150,
      stock: 7,
    },
    {
      name: "Gaming Headset",
      price: 200,
      stock: 3,
    },

    {
      name: "USB Hub",
      price: 40,
      stock: 20,
    },
    {
      name: "Laptop Stand",
      price: 60,
      stock: 8,
    },
  ]);

  console.log("Database seeded");
  process.exit();
}

seedDatabase();
