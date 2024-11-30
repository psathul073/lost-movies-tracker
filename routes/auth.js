import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs";
import "dotenv/config";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read User Data Securely.
const userData = path.join(__dirname, "..", "data", "users.json");
// Signup File.
const signupFile = path.join(__dirname, "..", "views", "signup.ejs");
// Login file.
const loginFile = path.join(__dirname, "..", "views", "login.ejs");

// Ensure the file exists
if (!fs.existsSync(userData)) {
  fs.writeFileSync(userData, "[]", "utf-8"); // Create an empty JSON array if the file doesn't exist
}

// Read JSON Files $Fun
function readJSON(filePath) {

  try {
     if (fs.existsSync(filePath)) {
    // Read JSON File And Return Object.
    const fileContent = fs.readFileSync(filePath, "utf-8").trim(); // Remove unnecessary spaces
    return fileContent ?  JSON.parse(fileContent) : []; // Handle empty files
  }
  // If The File Doesn't Exist, Create It With An Empty Array.
  fs.writeFileSync(filePath, "[]", "utf-8");
  return []; // Return an empty array if the file doesn’t exist.

  } catch (error) {
     console.error(`Error reading JSON file: ${error.message}`);
     // Reset The File If Tt's Corrupted.
    fs.writeFileSync(filePath, "[]", "utf-8");
    return []; // Return an empty array as a fallback.
  }
 
}

// Write JSON Files.
function writeJSON(filePath, data) {
  try {
    // Write A File And Converted In To JSON String.
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error(`Error writing JSON file: ${error.message}`);
  }
  
}

// Sign Up Route
router.post("/signup", async (req, res) => {
  // Store Username And Password In A Constant Variable.
  const { username, password } = req.body;
  // Store User Data.
  const users = readJSON(userData);

  // Check If User Is Already Exists.
  if (users.find((user) => user.username === username)) {
    return res.render(signupFile, {
      alertMsg: "User already exists! Please Login", // Pass alert message.
    });
  }

  // Has Password And Save The User.
  const hashPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashPassword });
  writeJSON(userData, users);

  // Redirect To Login Page With Success Message..
  return res.render(loginFile, {
    infoMsg: "User registered successfully. Login Now.", // Pass success Message.
  });
  // res.status(201).json({ message: "User registered successfully"});
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(userData);
  const user = users.find((user) => user.username === username); // Find user entered username in users data.

  // IF username And Password Not Matched.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.render(loginFile, {
      alertMsg: "Invalid username or password. Please try again.", // Pass error message
    });
    // res.status(400).json({ message: "Invalid Credentials" });
  }

  // Generate JSON WEB TOKEN (jwt) And Set The Cookie.
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  // Set token in HTTP-only cookie
  res.cookie("token", token, {
    maxAge: 86400000, // 1 day.
    httpOnly: true,
    secure: true,
  }); // 1 day in milliseconds.

  res.redirect("/"); // Redirect To Home Page.
});

// Log out Rout.
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Clear The Token Cookie.
  res.redirect("/login"); // Redirect To Login Page.
});

// Export This Module.
export default router;
