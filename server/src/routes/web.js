const express = require("express");
const router = express.Router();

//Schedule app custom code
const projectsController = require("../controllers/projects");
const update_projectsController = require("../controllers/update_projects");

let routes = app => {

    //router.get("/", projectsController.projects);
    //Schedule app custom code
      //router.get("/projects", projectsController.projects);
      app.use(projectsController.projects);
      app.use(update_projectsController.update_projects);
      //router.post("/update_projects", update_projectsController.update_projects);

  return app.use("/", router);
};

module.exports = routes;