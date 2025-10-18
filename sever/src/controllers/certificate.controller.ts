import { handleGetCertificateById, handleGetCertificates } from "../repositories/certificate.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";

export const getAllCertificates = RequestHandlerCustom(
  async (req, res) => {
    const certificates = await handleGetCertificates();

    res.status(200).json({
      message: "Get all certificates successfully",
      certificates: certificates
    });
  }
);

export const getCertificate = RequestHandlerCustom(
  async (req, res) => {
    const id = (req.params.id || req.query.id) as string;

    const certificate = await handleGetCertificateById({ id });

    res.status(200).json({
      message: "Get certificate successfully",
      certificate: certificate
    });
  }
);