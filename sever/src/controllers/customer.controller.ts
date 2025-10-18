import { handleGetCustomerById, handleGetCustomers } from "../repositories/customer.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";

export const getAllCustomers = RequestHandlerCustom(
  async (req, res) => {
    const customers = await handleGetCustomers();

    res.status(200).json({
      message: "Get all customers successfully",
      customers: customers
    });
  }
);

export const getCustomer = RequestHandlerCustom(
  async (req, res) => {
    const id = (req.params.id || req.query.id) as string;

    const customer = await handleGetCustomerById({ id });

    res.status(200).json({
      message: "Get customer successfully",
      customer: customer
    });
  }
);