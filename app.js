import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import bodyParser from "body-parser";
import "dotenv/config";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoute from "./routes/auth.js"; // Import the auth routes
import { hexoid } from "hexoid";
import cookieParser from "cookie-parser";
import axios from "axios";

const app = express();
const SECRET_KEY = process.env.SECRET_KEY;
const id = hexoid(); // Random Id.
const __filename = dirname(fileURLToPath(import.meta.url));
const API_URL = "http://www.omdbapi.com/";
const APIKey = process.env.API_KEY;
const contentsData = path.join(__filename, "data", "storage.json"); // Read movies and series storage data securely.
// Set Up EJS.
app.set("view engine", "ejs"); // Set EJS As The View Engine.
app.set("views", path.join(__filename, "views")); // Specify Where EJS Templates Will Be Located.

// Serve Static File In Public Directory.
app.use(express.static(path.join(__filename, "public")));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true })); // Middleware To Parse URL-encode data.( For form submission).
app.use(cookieParser()); // MiddlewareTo Parse Cookies
app.use(bodyParser.json()); // Parse Incoming JSON data.

// Use Authentication Routes.
app.use("/auth", authRoute); // Auth routes are mounted under /auth.

// Ensure the file exists
if (!fs.existsSync(contentsData)) {
  fs.writeFileSync(contentsData, "{}", "utf-8"); // Create an empty JSON array if the file doesn't exist
}

// Read JSON Files $Fun
function readJSON(filePath) {

  try {

     if (fs.existsSync(filePath)) {
    // Read JSON File And Return Object.
    const fileContent = fs.readFileSync(filePath, "utf-8").trim(); // Remove unnecessary spaces
    return fileContent ? JSON.parse(fileContent) : {}; // Handle empty files
  }
    // If The File Doesn't Exist, Create It With An Empty Array.
    fs.writeFileSync(filePath, "{}", "utf-8");
    return {}; // Return an empty array if the file doesn’t exist.

  } catch (error) {
     console.error(`Error reading JSON file: ${error.message}`);
     // Reset The File If Tt's Corrupted.
    fs.writeFileSync(filePath, "{}", "utf-8");
    return {}; // Return empty Obj as a fallback.
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

// Add A Middleware To verify Token.
function authenticateToken(req, res, next) {
  // Extract JSON Web Token From Cookies.
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/login");
    // status(401).json({ message: "Access Denied!, Please Log in" });
  }

  // Verify Token.
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.redirect("/login");
      // res.status(403).json({ message: "Invalid Token!" });
    }
    req.user = user; // Save user name in req.user obj.

    next(); // Pass control to the next middleware or route.
  });
}

// Signup Page.
app.get("/signup", (req, res) => {
  res.render("signup");
});
// Login Page.
app.get("/login", (req, res) => {
  res.render("login");
});

// Routes For Add Movies And Series.
app.get("/add", (req, res) => {
  res.render("add");
});

// Routes For View All Movies and Series For Authenticate User
app.get("/", authenticateToken, (req, res) => {
  const storageData = readJSON(contentsData);
  const username = req.user.username;
  const userContents = storageData[req.user.username] || [];
  const movies = userContents.filter((data) => data.type === "movie"); // Filter Movies Only.
  const series = userContents.filter((data) => data.type === "series"); // Filter Series Only.

  res.render("main", {
    contents: userContents,
    userName: username,
    totalData: userContents.length,
    totalMovies: movies.length,
    totalSeries: series.length,
  });
});

// Routes For View Movies Only.
app.get("/movies", authenticateToken, (req, res) => {
  const storageData = readJSON(contentsData);
  const username = req.user.username;
  const userContents = storageData[req.user.username] || [];
  // Filter Storage Data And Make Movies Only.
  const movies = userContents.filter((data) => data.type === "movie");
  const series = userContents.filter((data) => data.type === "series"); // Filter Series Only.

  res.render("main", {
    userName: username,
    contents: movies,
    totalData: userContents.length,
    totalMovies: movies.length,
    totalSeries: series.length,
  });
});

// Routes For View Movies Only.
app.get("/series", authenticateToken, (req, res) => {
  const storageData = readJSON(contentsData);
  const username = req.user.username;
  const userContents = storageData[req.user.username] || [];
  // Filter Storage Data And Make Movies Only.
  const series = userContents.filter((data) => data.type === "series");
  const movies = userContents.filter((data) => data.type === "movie"); // Filter Movies Only.

  res.render("main", {
    userName: username,
    contents: series,
    totalData: userContents.length,
    totalMovies: movies.length,
    totalSeries: series.length,
  });
});

// Routes For View Items.
app.get("/view/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const storageData = readJSON(contentsData);
  const userContents = storageData[req.user.username] || [];

  // Find the content with the matching id
  const viewContent = userContents.find((data) => data.id === id.trim());

  //  If not find content.
  if (!viewContent) {
    return res.send("content not found !");
  }
  res.render("view", {
    content: viewContent,
  });
});

// Routes For Edit Item View.
app.get("/edit/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const storageData = readJSON(contentsData);
  const userContents = storageData[req.user.username] || [];

  // Find the content with the matching id
  const viewContent = userContents.find((data) => data.id === id.trim());

  //  If not find content.
  if (!viewContent) {
    return res.send("content not found !");
  }
  res.render("edit", {
    content: viewContent,
  });
});

// Routes For Add Movies And Series Data From API.
app.post("/add/data", async (req, res) => {
  // console.log(req.body);

  const { title, year, plot, response, type } = req.body;
  try {
    const result = await axios.get(API_URL, {
      params: {
        apikey: APIKey,
        t: title,
        type: type,
        y: year,
        plot: plot,
        r: response,
      },
    });
    // console.log(result.data);

    res.render("add", { contents: result.data });
  } catch (error) {
    console.error(error.message);
  }
});

// Routes Add Movie Data For Authenticate User.
app.post("/add", authenticateToken, (req, res) => {
  const {
    title,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    country,
    language,
    plot,
    poster,
    rating,
    type,
    watchYear,
    watchCount,
    review,
    wLanguage,
    uRating,
    rpCount,
    subTitlesLink,
    lastWatchSeason,
    lastWatchEpisode,
    status,
  } = req.body;
  const userData = readJSON(contentsData);
  const moviesData = {
    id: id(),
    title: title,
    released: released,
    runtime: runtime,
    genre: genre,
    director: director,
    writer: writer,
    actors: actors,
    country: country,
    language: language,
    plot: plot,
    poster: poster,
    rating: rating,
    watchYear: watchYear,
    watchCount: watchCount,
    review: review,
    wLanguage: wLanguage,
    uRating: uRating,
    rpCount: rpCount,
    subTitlesLink: subTitlesLink,
    type: type,
  };

  const seriesData = {
    id: id(),
    title: title,
    released: released,
    runtime: runtime,
    genre: genre,
    director: director,
    writer: writer,
    actors: actors,
    country: country,
    language: language,
    plot: plot,
    poster: poster,
    rating: rating,
    watchYear: watchYear,
    watchCount: watchCount,
    review: review,
    wLanguage: wLanguage,
    uRating: uRating,
    rpCount: rpCount,
    subTitlesLink: subTitlesLink,
    lastWatchSeason: lastWatchSeason,
    lastWatchEpisode: lastWatchEpisode,
    status: status,
    type: type,
  };

  // Store Movies Data For Separately For Each User.
  // If There Is No Array For The User In Movies Object.
  if (!userData[req.user.username]) {
    userData[req.user.username] = []; // create empty array for the user.
  }
  // Store Movies And Series Data for users.
  if (type === "movie") {
    userData[req.user.username].push(moviesData);
  }
  if (type === "series") {
    userData[req.user.username].push(seriesData);
  }
  writeJSON(contentsData, userData); // Saved in json file path.

  // Send A Successful Message.
  res.render("add", {
    message: `${type} added successfully`,
  });

  // res.redirect("/"); // Redirect to home page.
  // res.status(201).json({ message: "Movie added successfully" });
});

// Route To Edit A Specific Data For Authenticate User.
app.post("/edit/:id", authenticateToken, (req, res) => {
  const { id } = req.params;

  const {
    title,
    released,
    runtime,
    genre,
    director,
    writer,
    actors,
    country,
    language,
    plot,
    poster,
    rating,
    type,
    watchYear,
    watchCount,
    review,
    wLanguage,
    uRating,
    rpCount,
    subTitlesLink,
    lastWatchSeason,
    lastWatchEpisode,
    status,
  } = req.body;

  // Movies Data.
  const moviesData = {
    id: id,
    title: title,
    released: released,
    runtime: runtime,
    genre: genre,
    director: director,
    writer: writer,
    actors: actors,
    country: country,
    language: language,
    plot: plot,
    poster: poster,
    rating: rating,
    watchYear: watchYear,
    watchCount: watchCount,
    review: review,
    wLanguage: wLanguage,
    uRating: uRating,
    rpCount: rpCount,
    subTitlesLink: subTitlesLink,
    type: type,
  };
  // Series Data.
  const seriesData = {
    id: id,
    title: title,
    released: released,
    runtime: runtime,
    genre: genre,
    director: director,
    writer: writer,
    actors: actors,
    country: country,
    language: language,
    plot: plot,
    poster: poster,
    rating: rating,
    watchYear: watchYear,
    watchCount: watchCount,
    review: review,
    wLanguage: wLanguage,
    uRating: uRating,
    rpCount: rpCount,
    subTitlesLink: subTitlesLink,
    lastWatchSeason: lastWatchSeason,
    lastWatchEpisode: lastWatchEpisode,
    status: status,
    type: type,
  };

  const storageData = readJSON(contentsData);

  const userContents = storageData[req.user.username] || [];

  // Find Edit Item Index.
  const itemIndex = userContents.findIndex((data) => data.id === id.trim());
  // Check The Item.
  if (itemIndex >= userContents || itemIndex < 0) {
    res.status(404).json({ message: "Item not found !" });
  }

  // Update Data Based On The Type.
  if (type === "movie") {
    userContents[itemIndex] = moviesData;
  }

  if (type === "series") {
    userContents[itemIndex] = seriesData;
  }

  //Update Storage Data.
  storageData[req.user.username] = userContents;

  // Saved In JSON File Path.
  writeJSON(contentsData, storageData);

  // Redirect To Home Page.
  res.redirect("/");
  // res.redirect(`/edit/${id}`);
});

// Route To Delete A Specific Data For Authenticate User.
app.post("/delete/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const storageData = readJSON(contentsData);
  const userContents = storageData[req.user.username] || [];

  // Filter Data Based On The Id.
  const filterContents = userContents.filter((data) => data.id !== id.trim());
  // Check The Item If Exist.
  if (!filterContents) {
    res.status(404).json({ message: "Item not found !" });
  }

  //Update Storage Data.
  storageData[req.user.username] = filterContents;

  // Saved In JSON File Path.
  writeJSON(contentsData, storageData);

  // Redirect To Home Page.
  res.redirect("/");
  // res.redirect(`/edit/${id}`);
});

// Route For Search Items In Data Storage.
app.post("/search", authenticateToken, (req, res) => {
  const { search } = req.body;
  const username = req.user.username;
  // console.log(search);
  const storageData = readJSON(contentsData);
  const userContents = storageData[req.user.username] || [];
  // Add Data Count Based On The Type.
  const movies = userContents.filter((data) => data.type === "movie"); // Filter Movies Only.
  const series = userContents.filter((data) => data.type === "series"); // Filter Series Only.

  // Find Matching Data And Filter.
  const findData = userContents.filter(
    (data) => data.title.trim().toLowerCase() === search.trim().toLowerCase()
  );
  //  console.log(findData);
  res.render("main", {
    userName: username,
    contents: findData,
    totalData: userContents.length,
    totalMovies: movies.length,
    totalSeries: series.length,
  });
});

// Catch All Routes For Unknown Paths (404 Handler).
app.use((req, res) => {
  res.status(404).send("Page Note Found!");
});

// Error Handling Middleware.
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack trace to the console.
  res.status(500).send("Something went wrong!"); // Send a generic error message.
});

// Start Server.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Is Running On Port ${PORT}.`));
