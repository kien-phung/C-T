import { ISubmitContactData } from "../controllers/contact.controller.js";
import { Contact } from "../models/contact.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleSubmitContact = HandlerCustom(async (data: ISubmitContactData) => {
    const contact = await new Contact(
        {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            message: data.message,
            submit_type: data.submit_type
        }
    ).save();

    return contact;
});