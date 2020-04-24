const { authJwt } = require("../middleware");
const controller = require("../controllers/jobs.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/jobs",[authJwt.verifyToken],controller.findAll);
  app.post("/api/jobs",[authJwt.verifyToken],controller.create);
  app.get("/api/jobs/:id",[authJwt.verifyToken],controller.findOne);
  app.put("/api/jobs/:id",[authJwt.verifyToken],controller.update);
  app.delete("/api/jobs/:id",[authJwt.verifyToken],controller.delete);
};
