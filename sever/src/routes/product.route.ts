import express from "express";
import { getAllProducts, getProduct } from "../controllers/product.controller.js";

const productRoute = express.Router();

// GET /api/products - get all products (supports category query param)
productRoute.get("/", getAllProducts);

// GET /api/products/:id - get a specific product by ID
productRoute.get("/:id", getProduct);

export default productRoute;