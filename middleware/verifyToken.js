import jws from "jsonwebtoken";
export default async (req, res, next) => {
    const authHeader =req.headers["authorization"] || req.headers["Authorization"];
    if(!authHeader)
        return res.status(401).send({state:"error" , msg:"require a token"})

    const token = authHeader.split(" ")[1] || null;

    if (!token)
        return res.status(401).send({ state: "error", msg: "require a token" });

    try {
        const decoded = jws.verify(token, process.env.privateKey);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name == "JsonWebTokenError")
            return res.status(401).send({ state: "error", msg: "expire token" });
        else return res.status(401).send({ state: "error", msg: "invalid token" });
    }
};

