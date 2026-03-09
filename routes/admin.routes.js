import express from "express";
import * as Product from "../models/product.model.js";
import * as Orders from "../models/order.model.js";
import upload from "../config/multer.js";
import { isSuperAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(isSuperAdmin);

router.get("/admin", async (req, res) => {
  try {
    const products = await Product.getAll();
    res.render("admin/dashboard", { products });
  } catch (err) {
    console.error(err);
    res.render("admin/dashboard", {
      products: [],
      error: "Failed to load products",
    });
  }
});

router.get("/admin/products/create", async (req, res) => {
  res.render("admin/product-form", { product: null, error: null });
});

router.get("/admin/products/:id/edit", async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.redirect("/admin");
    console.log(product);
    res.render("admin/product-form", { product, error: null });
  } catch (err) {
    console.error(err);
    res.redirect("/admin");
  }
});

router.post(
  "/admin/products/create",
  upload.single("image"),
  async (req, res) => {
    const { title, description, characteristics, price } = req.body;
    let image = null;
    if (req.file) image = "/uploads/products/" + req.file.filename;

    try {
      await Product.create({
        title,
        description,
        characteristics,
        price,
        image,
      });
      res.redirect("/admin");
    } catch (err) {
      console.error(err);

      res.render("admin/product-form", {
        product: null,
        error: "Something went wrong while creating the product",
      });
    }
  },
);

router.post(
  "/admin/products/:id/edit",
  upload.single("image"),
  async (req, res) => {
    const { title, description, characteristics, price } = req.body;
    try {
      const existingProduct = await Product.getById(req.params.id);
      if (!existingProduct) return res.redirect("/admin");

      let image = existingProduct.image;
      if (req.file) image = "/uploads/products/" + req.file.filename;

      await Product.update(req.params.id, {
        title,
        description,
        characteristics,
        price,
        image,
      });

      res.redirect("/admin");
    } catch (err) {
      console.error(err);

      const existingProduct = await Product.getById(req.params.id);
      res.render("admin/product-form", {
        product: existingProduct || null,
        error: "Something went wrong while updating the product",
      });
    }
  },
);

router.post("/admin/products/:id/delete", async (req, res) => {
  try {
    await Product.remove(req.params.id);
    res.redirect("/admin");
  } catch (err) {
    console.error(err);

    res.render("admin/product-form", {
      product: null,
      error: "Something went wrong while deleting the product",
    });
  }
});

router.get("/admin/orders", async (req, res) => {
  try {
    const orders = await Orders.getAll();
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const full = await Orders.getById(order.id);
        return full;
      }),
    );
    res.render("admin/orders", { orders: ordersWithItems });
  } catch (err) {
    console.error(err);
    res.render("admin/orders", {
      orders: [],
      error: "Failed to load orders",
    });
  }
});

router.post("/admin/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    await Orders.update(req.params.id, status);
    res.redirect("/admin/orders");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/orders");
  }
});

export default router;
