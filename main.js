import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes.js";
import verifyToken from "./middleware/verifyToken.js";
import allowTo from "./middleware/allowTo.js";
import errorMiddleWare from "./middleware/errorMiddleWare.js";

import dns from "dns";
dns.setServers(["8.8.8.8"]);

mongoose
    .connect(
        `mongodb+srv://${process.env.userNameMongo}:${process.env.passMongo}@${process.env.clusterName}.kdtuexs.mongodb.net/`,
    )
    .then(() => console.log("connect to db"))
    .catch((err) => {
        throw new Error(err);
    });

const app = express();
app.use(express.json());
app.use("/users", userRoute);
app.get("/adminPage", verifyToken, allowTo(["admin", "user"]), (req, res) => {
    console.log(req.decoded);

    res.send("inside admin page");
});
app.all("/*splat", (req, res) => {
    res.status(404).send({ state: "error", msg: "this link not exist" });
});
app.use(errorMiddleWare);
app.listen(process.env.port, () =>
    console.log(`app listening on port ${process.env.port}`),
);
