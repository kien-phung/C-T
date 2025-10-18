import { Product } from "../models/product.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleGetProducts = HandlerCustom(async () => {
  const products = await Product
    .find()
    .exec();

  return products;
});

export const handleGetProductById = HandlerCustom(async (data: { id: string }) => {
  const products = await Product
    .findById({ _id: data.id })
    .exec();

  return products;
});