import { Customer } from "../models/customer.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleGetCustomers = HandlerCustom(async () => {
    const customers = await Customer
        .find()
        .exec();

    return customers;
});

export const handleGetCustomerById = HandlerCustom(async (data: { id: string }) => {
    const customer = await Customer
        .find({ _id: data.id })
        .exec();

    return customer;
});