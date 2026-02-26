import express from "express";

import * as Orders from "../models/order.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/favourite", async (req, res) => {
  res.render("favourite");
});

router.get("/basket", async (req, res) => {
  res.render("basket");
});

router.get("/checkout", async (req, res) => {
  res.render("checkout", { error: null });
});

router.post("/orders", async (req, res) => {
  try {
    const { email, first_name, last_name, address, phone, total, cart } =
      req.body;
    if (!first_name || !last_name || !address || !phone || !email) {
      return res.render("checkout", { error: "all fields are required" });
    }
    let cartItems = [];

    try {
      cartItems = JSON.parse(cart);
    } catch {
      return res.render("checkout", { error: "invalid cart data" });
    }

    if (!cartItems.length) {
      return res.render("checkout", { error: "cart is empty" });
    }

    const items = cartItems.map((item) => ({
      product_id: item.id,
      title: item.title,
      price: item.price,
      quantitity: item.quantitity,
      image: item.image,
    }));

    const orderId = await Orders.create(
      {
        first_name,
        last_name,
        address,
        phone,
        email,
        total: parseFloat(total),
      },
      items,
    );
    res.render("order-success", { orderId });
  } catch (error) {
    console.log(error);
    res.render("checkout", { error: "something went wrong" });
  }
});

export default router;
