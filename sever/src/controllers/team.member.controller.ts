import { handleGetTeamMemberById, handleGetTeamMembers } from "../repositories/team.member.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";

export const getAllTeamMembers = RequestHandlerCustom(
  async (req, res) => {
    const teamMembers = await handleGetTeamMembers();

    res.status(200).json({
      message: "Get all team members successfully",
      teamMembers: teamMembers
    });
  }
);

export const getTeamMember = RequestHandlerCustom(
  async (req, res) => {
    const id = (req.params.id || req.query.id) as string;

    const teamMember = await handleGetTeamMemberById({ id });

    res.status(200).json({
      message: "Get team member successfully",
      teamMember: teamMember
    });
  }
);