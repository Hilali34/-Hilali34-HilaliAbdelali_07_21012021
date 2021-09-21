const express = require("express");
require('sequelize');
require('dotenv').config();
const helmet = require("helmet");
const path = require("path");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");


const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, params, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/groupomania/post", postRoutes);
app.use("/groupomania/user", userRoutes);
app.use("/groupomania/profile", profileRoutes);
app.use("/groupomania/comment", commentRoutes);
app.use("/groupomania/", likeRoutes);

module.exports = app;
