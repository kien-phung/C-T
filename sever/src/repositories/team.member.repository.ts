import { TeamMember } from "../models/team.member.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleGetTeamMembers = HandlerCustom(async () => {
  const members = await TeamMember
    .find()
    .exec();

  return members;
});

export const handleGetTeamMemberById = HandlerCustom(async (data: { id: string }) => {
  const member = await TeamMember
    .findById({ _id: data.id })
    .exec();

  return member;
});