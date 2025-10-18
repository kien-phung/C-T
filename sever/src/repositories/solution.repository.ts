import { Solution } from "../models/solution.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleGetSolutions = HandlerCustom(async () => {
    const solutions = await Solution
        .find()
        .sort({ createdAt: -1 })
        .exec();

    return solutions;
});

export const handleGetSolutionBySlug = HandlerCustom(async (data: { slug: string }) => {
    const solution = await Solution
        .findOne({ slug: data.slug })
        .exec();

    return solution;
});