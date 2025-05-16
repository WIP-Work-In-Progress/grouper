const express = require("express");
const config = require("./config");
const app = express();

// test db connection - TO DELETE LATER
const db = require("./database/connection");

app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, environment: config.env });
});

// test db connection endpoint - TO DELETE LATER
app.get("/api/db", (req, res) => {
  const result = db.prepare("SELECT * FROM registrations").get();
  res.status(200).json({ ok: true, data: result });
});

module.exports = app;
