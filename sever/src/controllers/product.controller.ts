import { handleGetProductById, handleGetProducts } from "../repositories/product.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";

export const getAllProducts = RequestHandlerCustom(
  async (req, res) => {
    const products = await handleGetProducts();

    res.status(200).json({
      message: "Get all products successfully",
      products: products
    });
  }
);

export const getProduct = RequestHandlerCustom(
  async (req, res) => {
    const id = (req.params.id || req.query.id) as string;

    const product = await handleGetProductById({ id });

    res.status(200).json({
      message: "Get product successfully",
      product: product
    });
  }
);