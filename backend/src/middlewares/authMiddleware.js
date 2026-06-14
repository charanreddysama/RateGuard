import jwt from "jsonwebtoken";

// ==========================================
// AUTHENTICATION MIDDLEWARE
// Think of this like a bouncer at a club.
// Every time a user tries to visit a protected route (like viewing their dashboard),
// this function runs first to check if they have a valid VIP pass (JWT token).
// ==========================================

export const authMiddleware = (req, res, next) => {
  try {
    // 1. Check if the user sent a token in their cookies
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      // 2. If there is no token at all, stop them here. (401 Unauthorized)
      return res.status(401).json({
        message: "No token provided, access denied."
      });
    }

    // 3. Try to verify the token using our super secret server key
    // If someone tried to forge a fake token, this will crash and go to the catch block
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 4. Success! The token is real. 
    // We attach the decoded user data (like their ID) to the request so the next function can use it.
    req.user = decoded;

    // 5. Let the user through the door to their destination!
    next();

  } catch (error) {
    // If the token was expired, fake, or corrupted, deny access.
    res.status(401).json({
      message: "Unauthorized: Invalid or expired token"
    });
  }
};