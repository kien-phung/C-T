import express from "express";
import { getAllCertificates, getCertificate } from "../controllers/certificate.controller.js";

const certificateRoute = express.Router();

// GET /api/certificates - get all certificates
certificateRoute.get("/", getAllCertificates);

// GET /api/certificates/:id - get a specific certificate by ID
certificateRoute.get("/:id", getCertificate);

export default certificateRoute;