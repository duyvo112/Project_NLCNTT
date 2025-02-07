const uploadRoutes = require("./upload");
const userRoutes = require("./user");
const authRoutes = require("./auth");

const InitRoutes = (app) => { 
    app.use("/api/upload",uploadRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/auth", authRoutes);
}
module.exports = InitRoutes;