import jwt from 'jsonwebtoken';

// Middleware to authenticate user with JWT
export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
  }
};

// We can remove authorizeAdmin completely or keep it as a no-op
export const authorizeAdmin = (req, res, next) => {
  // Skip role check entirely
  next();
};
