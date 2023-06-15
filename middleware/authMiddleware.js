const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, '05ebb14a84aabcf4747f7481859dceea01b591f225cf7580a353fc3122fd7539', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
};

module.exports = {
    verifyToken
};