
const Project = require("../models/project");

const express = require("express");
const router = express.Router();

router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find({})   

    if( projects === null ){
      console.log({ message: 'it didnt find it' })
    }
    console.log(projects);

    res.send({ projects })

    //( JSON.stringify(projects) )
    //body({ projects })

  } catch (error) {
    console.log(error); 
  }
}); 

module.exports = {
  projects: router
};