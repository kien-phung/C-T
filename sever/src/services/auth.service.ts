import { PRIVATE_CHARS } from "../utils/configs/constants.js";
import { ErrorCustom, HandlerCustom } from "../utils/configs/custom.js";

export const generateRandomPassword = () => {
    const chars = PRIVATE_CHARS;
    let password = "";
    for (let i = 0; i < 10; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};