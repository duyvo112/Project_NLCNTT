const postRoutes = require("./post");
const userRoutes = require("./user");
const authRoutes = require("./auth");

const InitRoutes = (app) => { 
    app.use("/api/post",postRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/auth", authRoutes);
}
module.exports = InitRoutes;