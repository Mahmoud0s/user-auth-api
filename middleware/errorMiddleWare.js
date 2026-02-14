export default (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ state: "Error", msg: err.message });
};
