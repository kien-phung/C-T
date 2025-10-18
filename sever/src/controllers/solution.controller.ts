import { handleGetSolutions, handleGetSolutionBySlug } from "../repositories/solution.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";

export const getAllSolutions = RequestHandlerCustom(
  async (req, res) => {
    const solutions = await handleGetSolutions();

    res.status(200).json({
      message: "Get all solutions successfully",
      solutions: solutions
    });
  }
);

export const getSolutionBySlug = RequestHandlerCustom(
  async (req, res) => {
    const slug = (req.params.slug || req.query.slug) as string;

    const solution = await handleGetSolutionBySlug({ slug });

    res.status(200).json({
      message: "Get solution successfully",
      solution: solution
    });
  }
);