import { handleGetProductById, handleGetProducts } from "../repositories/product.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { Product } from "../models/product.model.js";

export const getAllProducts = RequestHandlerCustom(
  async (req, res) => {
    const { category, search, only_published } = req.query as any;
    const filter: any = {};
    if (category) filter.category = category;
    if (only_published === 'true') filter.is_published = true;
    if (search) {
      filter.$or = [
        { name_vn: { $regex: String(search), $options: 'i' } },
        { name_en: { $regex: String(search), $options: 'i' } },
        { description: { $regex: String(search), $options: 'i' } },
      ];
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Get all products successfully",
      products
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