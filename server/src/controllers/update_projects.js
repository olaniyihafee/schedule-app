
const Project = require("../models/project");

const express = require("express");
const router = express.Router();

router.post("/project", async (req, res) => {
  console.log(req.body)
  try {
    const { projectname, startdate, enddate, tastks } = req.body
    const response = await Project.create({ projectname, startdate, enddate, tastks })  

    /* if( response === null ){
      console.log({ message: 'it didnt find it' })
    } */
    console.log('response: '+response);

    //res.send({ projects })

    //( JSON.stringify(projects) )
    //body({ projects })

  } catch (error) {
    console.log(error); 
  }
}); 

router.post("/task", async (req, res) => {

    try {
      const projects = await Project.updateOne({})   
  
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

  
  router.post("/subtask", async (req, res) => {
    
    try {
      const projects = await Project.findOneAndModify({})   
  
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


  router.post("/edit_project", async (req, res) => {
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
  
  router.post("/edit_task", async (req, res) => {
  
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
  
    
    router.post("/edit_subtask", async (req, res) => {
      
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


    router.post("/delete_project", async (req, res) => {
        try {
          const projects = await Project.remove({})   
      
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
      
      router.post("/delete_task", async (req, res) => {
      
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
      
        
        router.post("/delete_subtask", async (req, res) => {
          
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
    update_projects: router
};