const mongoose =  require("mongoose");

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectname: String,
    startdate: String,
    enddate: String,
    tastks: [ [Object], [Object] ]
})

const Project = mongoose.model('project', projectSchema);

module.exports = Project;  


/* const subtaskSchema = new Schema({
    subtastks: {
        subtaskname: String,
        startdate: String,
        enddate: String,
        days: { type: [String], },
        times: { type: [String], },
    }, 
})

const taskSchema = new Schema({
    tastks: {
        taskname: String,
        startdate: String,
        enddate: String,
        days: { type: [String], },
        times: { type: [String], },
        
        subtastks: subtaskSchema
    },
})

const projectSchema = new Schema({
    projectname: String,
    startdate: String,
    enddate: String,

    tastks: taskSchema 
})

const project = mongoose.model('User', projectSchema);

module.exports = project;  */


