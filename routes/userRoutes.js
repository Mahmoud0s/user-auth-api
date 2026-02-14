import express from "express";
import {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    login,
} from "../controller/userController.js";
import verifyToken from "../middleware/verifyToken.js";
import allowTo from "../middleware/allowTo.js";
const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.post("/register", createUser);
userRoute
    .route("/:userId")
    .get(verifyToken, allowTo(["user", "admin"]), getSingleUser)
    .put(verifyToken, allowTo(["admin"]), updateUser)
    .delete(verifyToken, allowTo(["admin"]), deleteUser);
userRoute
    .route("/")
    .get(verifyToken, allowTo(["user", "admin"]), getAllUsers);

export default userRoute;
