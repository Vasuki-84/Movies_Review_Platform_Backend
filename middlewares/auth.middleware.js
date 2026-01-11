const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); 

const authMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
     
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // Verify JWT
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      // Find the user in DB
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }

      req.user = user; 

      // Check role if roles are specified
      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: "Forbidden: You don't have access to this resource",
        });
      }

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err);
      return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
