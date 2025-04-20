require("dotenv").config();

// This is where we are keeping our configuration
// settings. We are using dotenv to load environment variables
// from a .env file into process.env. This is useful for
// keeping sensitive information like API keys and database
// connection strings out of our source code.
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
};

module.exports = config;
