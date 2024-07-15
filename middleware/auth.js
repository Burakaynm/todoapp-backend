const jwt = require('jsonwebtoken');

// Middleware to authenticate user using JWT
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send({ message: "Access Denied: No Token Provided!" });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid or Expired Token" });
    }
};

module.exports = auth;