const jwt = require("jsonwebtoken");
const userModel  = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the Authorization header is present
    const token =  req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    // Clean and verify the token
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("Token from auth middleware:", jwtToken);
    
    // Verify the token and extract user information
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, Invalid Token" });
    }

    // Fetch the user from the database without the password field
    const userData = await userModel.findOne({ email: decoded.email }).select({password:0});
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user data to the request object
    req.user = userData;
    req.token = jwtToken;
    req.userID = userData._id;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error.message);
    return res.status(401).json({ message: "Unauthorized, Token verification failed" });
  }
};

module.exports = authMiddleware;
