import express from "express";
import { submitContact } from "../controllers/contact.controller.js";

const contactRoute = express.Router();

// POST /api/contacts - submit new contact
contactRoute.post("/", submitContact);

export default contactRoute;