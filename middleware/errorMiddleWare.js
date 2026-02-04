export default (err, req, res, next) => {
    console.log(err.statusCode);
    
    res.status(err.statusCode || 500).send({ state: "Error", msg: err.message });
};
