// Create express app
var express = require("express");
var app = express();
var db = require("./database.js");

// Server port
var HTTP_PORT = 8090;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});
// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ message: "Ok" });
});

// Insert here other API endpoints
app.get("/api/farms", (req, res, next) => {
  console.log("inside");
  var sql = "select * from farm";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

app.get("/api/report", (req, res, next) => {
  console.log("inside");
  var sql =
    "select f.name, sum(p.price * v.amount) as total_value from farm as f join vegetables as v join price as p ON f.id = v.farmField and v.crop = p.name group by f.name  ";
  var params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});



