// import { HandlerCustom } from "../utils/configs/custom.js";

// export const handleGetAllJobs = HandlerCustom(async () => {
//   const jobs = await Job
//     .find()
//     .exec();

//   return jobs;
// });

// export const handleGetJobById = HandlerCustom(async (data: { id: string }) => {
//   const jobs = await Job
//     .findById({ _id: data.id })
//     .exec();

//   return jobs;
// });