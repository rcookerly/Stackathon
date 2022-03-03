const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;
const DIST_PATH = path.join(__dirname, "../dist");
const HTML_PATH = path.join(__dirname, "../public/index.html");
const PUBLIC_PATH = path.join(__dirname, "../public");

const app = express();

// Static file-serving middleware
app.use(express.static(DIST_PATH));
app.use(express.static(PUBLIC_PATH));

// Sends our index.html (the "single page" of our SPA)
app.get("/", (req, res) => {
  res.sendFile(HTML_PATH);
});

/*
This middleware will catch any URLs resembling a file extension
(for example: .js, .html, .css).
This allows for proper 404s instead of the wildcard '#<{(|' catching
URLs that bypass express.static because the given file does not exist.
*/
app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) {
    res.status(404).end();
  } else {
    next();
  }
});

// Error catching endware
app.use((err, req, res, next) => {
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const init = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
