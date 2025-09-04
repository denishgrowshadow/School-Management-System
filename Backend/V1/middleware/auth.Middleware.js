const jwt = require('jsonwebtoken');
const ENV = require('../config/env.Config');
const Response = require('../response/api_Response');
const status = require('../config/StatusCode.Config');
const authMiddleware = {}

// ✅ GraphQL-safe function (no res/next)
authMiddleware.graphqlVerifyToken = async ({ req }) => {
  const token = req?.headers?.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    return { user: decoded };
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

// JWT Token Verification Middleware
authMiddleware.verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.replace('Bearer ', '');

  if (!token) {
    return Response.error(res, "No token provided", status.Unauthorized);
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return Response.error(res, "Invalid or expired token", status.Bad_Request);
  }
};

// Middleware to check the Main
authMiddleware.isAdmin = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return Response.error(res, "Access denied. Insufficient role.", status.Forbidden);
    }
    next();
  };
};

// // middleware/auth.Middleware.js
// const isAdmins = (roles = []) => {
//     return (req, res, next) => {
//         const userRole = req.user.role;

//         if (!roles.includes(userRole)) {
//             return Response.error(res, "Access denied. Insufficient role.", status.Forbidden);
//         }

//         next();
//     };
// };



module.exports = authMiddleware;
