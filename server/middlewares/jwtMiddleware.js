const jwt = require("jsonwebtoken");

const validateJwtToken = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ err: 'Token not available' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ err: 'Unauthorized User' });
    }

    try {
        const validateToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = validateToken;
        next();
    } catch (err) {
        console.error("Error occurred:", err.message);
        return res.status(403).json({ err: 'Invalid Token' });
    }
}

module.exports = { validateJwtToken };
