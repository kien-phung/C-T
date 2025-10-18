// import { RequestHandlerCustom } from "../utils/configs/custom.js";
// import { parseRequestData } from "../utils/configs/helper.js";

// export interface ISubmitContactData {
//   name: string,
//   email: string,
//   program: string,
//   phone: string,
//   message: string
// };

// export const submitContact = RequestHandlerCustom(
//   async (req, res) => {
//     const data: ISubmitContactData = parseRequestData(req);
//     const contact = await handleSubmitContact(data);

//     res.status(201).json({
//       success: true,
//       message: "New contact created",
//       contact: contact
//     });
//   }
// );