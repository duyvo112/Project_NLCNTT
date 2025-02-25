const postRoutes = require("./post");
const userRoutes = require("./user");
const authRoutes = require("./auth");
const exploreRoutes = require("./explore");

const InitRoutes = (app) => {
  app.use("/api/post", postRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/explore", exploreRoutes);
};
module.exports = InitRoutes;
