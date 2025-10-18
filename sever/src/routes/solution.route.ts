import express from "express";
import { getAllSolutions, getSolutionBySlug } from "../controllers/solution.controller.js";

const solutionRoute = express.Router();

// GET /api/solutions - get all solutions (supports category query param)
solutionRoute.get("/", getAllSolutions);

// GET /api/solutions/:slug - get a specific solution by slug
solutionRoute.get("/:slug", getSolutionBySlug);

export default solutionRoute;