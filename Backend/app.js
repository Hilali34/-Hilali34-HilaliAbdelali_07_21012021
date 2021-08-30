const express = require("express");
require('dotenv').config({path:"./.env"});
require('sequelize');
const helmet = require("helmet");
const path = require("path");
const db =require("./models")
const messagesRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const PORT = process.env.PORT || 3000;

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


app.use("/groupomania/messages", messagesRoutes);
app.use("/groupomania/auth", userRoutes);

module.exports = app;
