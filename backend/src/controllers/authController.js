import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==========================================
// REGISTER FUNCTION: Creates a new user
// ==========================================
export const register = async (req, res) => {
  try {
    // 1. Get the name, email, and password that the user typed in the frontend form
    const { name, email, password } = req.body;

    // 2. Check the database to see if a user with this email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If they exist, stop here and send back an error message (400 Bad Request)
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // 3. Security: Hash (scramble) the password so we don't store plain text passwords
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create the new user and save them into the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // 5. Generate a digital "keycard" (JWT token) that keeps the user logged in for 7 days
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 6. Send a success message along with the token and user data back to the frontend
    res.status(201).json({
      message: "User Registered",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    // If anything goes wrong, catch the error and send a 500 Internal Server Error
    res.status(500).json({
      message: error.message
    });
  }
};

// ==========================================
// LOGIN FUNCTION: Authenticates an existing user
// ==========================================
export const login = async (req, res) => {
  try {
    // 1. Get the email and password from the frontend login form
    const { email, password } = req.body;

    // 2. Search the database for a user matching this email
    const user = await User.findOne({ email });

    if (!user) {
      // If no user is found, deny access
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    // 3. Compare the typed password with the scrambled password stored in the database
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      // If passwords don't match, deny access
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    // 4. Generate a new JWT token for this login session
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // 5. Send the token and user data to the frontend so they can access the dashboard
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    // Handle unexpected server crashes during login
    res.status(500).json({
      message: error.message
    });
  }
};