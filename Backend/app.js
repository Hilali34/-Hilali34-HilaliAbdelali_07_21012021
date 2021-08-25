const express = require("express");
require('dotenv').config({path:"./.env"});
const helmet = require("helmet");
const path = require("path");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/api/posts", postsRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
