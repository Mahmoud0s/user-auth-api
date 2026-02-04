import jwt from "jsonwebtoken";
import "dotenv/config";
export default (data, expDate = "10m") => {
    const token = jwt.sign(data, process.env.privateKey, {
        expiresIn: expDate,
    });

    return token;
};
