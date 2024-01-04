const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied. Token not provided.' });

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) return res.status(403).json({ error: 'Access denied. Invalid token.' });
    req.user = decodedToken.user;;
    next();
  });
};

module.exports = authenticateToken;