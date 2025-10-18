import express from "express";
import { getAllCustomers, getCustomer } from "../controllers/customer.controller.js";

const customerRoute = express.Router();

// GET /api/customers - get all customers (supports category query param)
customerRoute.get("/", getAllCustomers);

// GET /api/customers/:id - get a specific customer by ID
customerRoute.get("/:id", getCustomer);

export default customerRoute;