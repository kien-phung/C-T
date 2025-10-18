import { Certificate } from "../models/certificate.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleGetCertificates = HandlerCustom(async () => {
    const certificates = await Certificate
        .find()
        .exec();

    return certificates;
});

export const handleGetCertificateById = HandlerCustom(async (data: { id: string }) => {
    const certificate = await Certificate
        .find({ _id: data.id })
        .exec();

    return certificate;
});