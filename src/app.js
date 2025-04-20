const express = require("express");
const config = require("./config");
const app = express();

app.get("/api/health", (req, res) => {
  res.status(200).json({ ok: true, environment: config.env });
});

module.exports = app;
