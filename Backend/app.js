const express = require("express");
require('sequelize');
require('dotenv').config({path:"./config/.env"});
const helmet = require("helmet");
const path = require("path");
const db =require("./models")
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const PORT = process.env.PORT || 5000;

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

db.sequelize.sync().then(()=> {
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`);
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));


app.use("/groupomania/post", postRoutes);
app.use("/groupomania/user", userRoutes);
app.use("/groupomania/profile", profileRoutes);
app.use("/groupomania/comment", commentRoutes);
app.use("/groupomania/", likeRoutes);

module.exports = app;
