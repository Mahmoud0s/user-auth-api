import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        validate: [
            (value) => validator.isLength(value, { min: 8 }),
            "name must be at least 8 charactiers ",
        ],
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    hashpass: String,
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "invaliad email "],
        unique: true,
    },
    age: {
        required: true,
        type: String,
        validate: [
            (value) => validator.isInt(value, { min: 18 }),
            "age must to be more then 18+",
        ],
    },
    role: {
        type: String,
        enum: ["guest", "user", "admin"],
        default: "guest",
    },
});

userSchema.pre("save", async function () {
    this.hashpass = await bcrypt.hash(this.password, await bcrypt.genSalt(6));
});
userSchema.pre("findOneAndUpdate", async function () {
    const update = this.getUpdate();
    if (!update.password) return;

    const hashpass = await bcrypt.hash(
        update.password,
        await bcrypt.genSalt(6),
    );
    if (!update.$set) update.$set = {};
    update.$set.hashpass = hashpass;
});

export default mongoose.model("user-project", userSchema);
