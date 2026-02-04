import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import genrateToken from "../utils/genrateToken.js";
const createUser = async (req, res, next) => {
    try {
        const user = await userModel.create(req.body);
        res.send({
            state: "success",
            data: user,
        });
    } catch (err) {
        next(err);
    }
};
const getAllUsers = async (req, res, next) => {
    try {
        const data = await userModel.find();
        res.send({ state: "success", data });
    } catch (err) {
        next(err);
    }
};
const getSingleUser = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ _id: req.params.userId });
        res.send({ state: "success", data: user });
    } catch (err) {
        next(err);
    }
};
const deleteUser = async (req, res, next) => {
    try {
        await userModel.deleteOne({ _id: req.params.userId });
        res.send({ state: "success", data: [] });
    } catch (err) {
        next(err);
    }
};
const updateUser = async (req, res, next) => {
    try {
        const updateUser = await userModel.findOneAndUpdate(
            { _id: req.params.userId },
            req.body,
            {
                runValidators: true,
                new: true,
            },
        );

        res.send({
            state: "success",
            data: updateUser,
        });
    } catch (err) {
        next(err);
    }
};
const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;
        const selectedUser = await userModel.findOne({ userName });
        if (!selectedUser)
            return res
                .status(404)
                .send({ state: "error", msg: "user not found" });

        const checkPass = await bcrypt.compare(
            `${password}`,
            selectedUser.hashpass,
        );
        if (!checkPass)
            return res.status(400).send({
                state: "fail",
                msg: "user or password not correct",
            });

        const newUser = selectedUser.role == "guest";
        // update state
        if (newUser)
            await userModel.updateOne(
                { _id: selectedUser._id },
                { role: "user" },
            );
        // generate token
        const token = genrateToken(
            {
                userName,
                id: selectedUser._id,
                role: newUser ? "user" : selectedUser.role,
                email: selectedUser.email,
            },
            "1h",
        );
        res.send({ state: "success", data: token });
    } catch (err) {
        next(err);
    }
};

export {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteUser,
    updateUser,
    login,
};
