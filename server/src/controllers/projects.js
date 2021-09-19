
const mongoose =  require("mongoose");
const Project = require("../models/project");

const get_projects = async (req, res) => {

  //const url = "mongodb://localhost:27017/juniper"
  const url = process.env.MONGODB_URI || "mongodb://localhost:27017/juniper"
  const options = { useNewUrlParser: true, useUnifiedTopology: true }

  try{
    await mongoose.connect( url ,options)
  }catch(err){
    console.log(err)}

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
}; 

module.exports = {
  projects: get_projects
};