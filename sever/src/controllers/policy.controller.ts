import { RequestHandlerCustom } from '../utils/configs/custom.js';
import { Policy } from '../models/policy.model.js';

/**
 * Public: Get all policies
 */
export const getAllPolicies = RequestHandlerCustom(async (req, res) => {
  const items = await Policy.find({ is_published: true }).sort({ display_order: 1, createdAt: -1 });
  res.status(200).json({ success: true, policies: items });
});