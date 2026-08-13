import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

import { testConnection } from "./src/models/db.js";
import routes from "./src/routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

const NODE_ENV =
  process.env.NODE_ENV?.toLowerCase() || "production";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false
  })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    res.locals.messageType = req.session.messageType;

    delete req.session.message;
    delete req.session.messageType;

    res.locals.isLoggedIn = !!req.session.user;
    res.locals.user = req.session.user || null;
    res.locals.NODE_ENV = NODE_ENV;

    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use("/", routes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Page Not Found"
  });
});

// 500 page
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).render("500", {
    title: "Server Error"
  });
});

app.listen(PORT, async () => {
  try {
    await testConnection();

    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error(error);
  }
});