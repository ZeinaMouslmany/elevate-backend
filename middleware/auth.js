const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  // Get Authorization header - check multiple sources
  // Express may normalize headers, but check both lowercase and original case
  const authHeader = req.headers.authorization || 
                     req.headers['authorization'] || 
                     req.headers['Authorization'] ||
                     req.get('authorization') || 
                     req.get('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  // Extract token from "Bearer <token>" format
  let token;
  if (authHeader.startsWith('Bearer ') || authHeader.startsWith('bearer ')) {
    token = authHeader.substring(7).trim();
  } else {
    token = authHeader.trim();
  }
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
