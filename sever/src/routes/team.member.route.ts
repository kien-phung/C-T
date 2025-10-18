import express from "express";
import { getAllTeamMembers, getTeamMember } from "../controllers/team.member.controller.js";

const teamMemberRoute = express.Router();

// GET /api/team-members - get all team members
teamMemberRoute.get("/", getAllTeamMembers);

// GET /api/team-members/:id - get a specific team member by ID
teamMemberRoute.get("/:id", getTeamMember);

export default teamMemberRoute;