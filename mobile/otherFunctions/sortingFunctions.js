import { getRequest } from './api'


export const sortedProjects = async ()=> {
    var read
    return read = getRequest('/home')
    .then((responseJson) => {
        console.log(responseJson)
        var read
        return read = sortProjects(responseJson)
        //console.log('read: '+read )
      })
      .catch((error) => {
        console.error(error);
      });

      
    
}


const sortProjects = async (data) => {
    const validProjects = validateProjects(data)
    const validProjectsWithTasks = validateTasks(validProjects)
    const validProjectsWithTasksAndDays = sortDaysOfTheWeek(validProjectsWithTasks)
    const validProjectsWithTasksAndDaysAndTimeOfDay = sortTimeOfTheDay(validProjectsWithTasksAndDays)

    return validProjectsWithTasksAndDaysAndTimeOfDay

}//end of sortProjects


const validateProjects = (data) =>{
    let validProjects = []
    //console.log('read: '+JSON.stringify(data))

    //check for valid projects
    data.projects.forEach((project, index)=>{
        const startdate = new Date(project.startdate)

        const presentdate = new Date()
        const enddate = new Date(project.enddate)
        const nextWeek = new Date(Date.now() + (7*24*60*60*1000))

        const projectInclusionCondition =  ((startdate <= presentdate) && (enddate >= nextWeek)) ||
        ((startdate >= presentdate) && (enddate >= nextWeek))||
        ((startdate <= presentdate) && (enddate >= nextWeek)) 
        if(projectInclusionCondition){
            validProjects.push(project)
        }
    }) //data.projects

    //console.log('validProjects: '+[...validProjects])
    return validProjects
}//end of validateProjects

const validateTasks = (validProjects) =>{
    let newProjectsCollection = []

    validProjects.forEach((project, projectIndex)=>{
        const projectname = project.projectname
        //console.log('project.projectname: '+project.projectname)
        newProjectsCollection.push({'projectname': projectname, 'tasks':[]})

        const tasks = project.tastks
        //console.log('tasks: '+tasks)

        tasks.forEach((task, taskIndex)=>{
            task.forEach((dtask, taskIndex)=>{
                const startdate = new Date(dtask.startdate)

                const presentdate = new Date()
                const enddate = new Date(dtask.enddate)
                const nextWeek = new Date(Date.now() + (7*24*60*60*1000))

                const projectInclusionCondition =  ((startdate <= presentdate) && (enddate >= nextWeek)) ||
                ((startdate >= presentdate) && (enddate >= nextWeek))||
                ((startdate <= presentdate) && (enddate >= nextWeek))
                //console.log('projectInclusionCondition: '+projectInclusionCondition) 
                if(projectInclusionCondition){
                    //console.log('newProjectsCollection[projectIndex][tasks]: '+JSON.stringify(newProjectsCollection[projectIndex].tasks) )
                    const placeholder = newProjectsCollection[projectIndex][tasks]
                    newProjectsCollection[projectIndex].tasks.push(dtask)
                }

            })//end of task for each

        }) //end of validate project for each   
    })

    //console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection))
    return newProjectsCollection
}//end of validateTasks

const sortDaysOfTheWeek = (validProjectsWithTasks) => {
    let newProjectsCollection = []

    validProjectsWithTasks.forEach((project, projectIndex)=>{
        newProjectsCollection.push({'projectname': project.projectname,
         'mon':[],'tue':[],'wed':[],
         'thr':[],'fri':[],'sat':[],
         'sun':[]})

        //console.log('tasks: '+JSON.stringify(project.tasks.length))
        const tasks = project.tasks

        tasks.forEach((task, taskIndex)=>{
            //console.log('task in: '+JSON.stringify(task))
            //task.forEach((dtask, taskIndex)=>{
                
                if(task.days.includes('mon')){
                    newProjectsCollection[projectIndex].mon.push({'taskname': task.taskname,'times':task.times,'subtasks':task.subtastks})
                } 
                if(task.days.includes('tue')){
                    newProjectsCollection[projectIndex].tue.push({'taskname': task.taskname,'times':task.times,'subtasks':task.subtastks})
                } 
                if(task.days.includes('wed')){
                    newProjectsCollection[projectIndex].wed.push({'taskname': task.taskname,'times':task.times,'subtasks':task.subtastks})
                } 
                if(task.days.includes('thr')){
                    newProjectsCollection[projectIndex].thr.push({'taskname': task.taskname,'times':task.times,'subtasks':task.subtastks})
                } 
                if(task.days.includes('fri')){
                    newProjectsCollection[projectIndex].fri.push({'taskname': task.taskname,'times':task.times,'subtasks':task.subtastks})
                } 
                if(task.days.includes('sat')){
                    newProjectsCollection[projectIndex].sat.push({'taskname': task.taskname,'times':task.times,'subtasks':task.subtastks})
                } 
                if(task.days.includes('sun')){
                    newProjectsCollection[projectIndex].sun.push({'taskname': task.taskname,'times':task.times,'subtasks':task.subtastks})
                } 

                
        })

        }) //end of validate project for each   

        //console.log('newProjectsCollection inside sortDaysOfWeek: '+JSON.stringify(newProjectsCollection))
        return newProjectsCollection
}//end of sortDaysOfTheWeek

const june = [
                {"projectname":"Hall-Mart",
                    "mon":[{"taskname":"Organise Marketing","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "tue":[{"taskname":"Organise Marketing","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "wed":[{"taskname":"Organise Marketing","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "thr":[{"taskname":"Entire Planning","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Check the Entire Work","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],
                    "fri":[{"taskname":"Entire Planning","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Check the Entire Work","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],
                    "sat":[],
                    "sun":[{"taskname":"Entire Planning","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Check the Entire Work","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}]}
                ,{"projectname":"Mark-47",
                    "mon":[{"taskname":"Edit the Iron-Man Suite","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "tue":[{"taskname":"Edit the Iron-Man Suite","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "wed":[{"taskname":"Edit the Iron-Man Suite","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "thr":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Buy Toilet Paper","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Go For a Walk","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],
                    "fri":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Buy Toilet Paper","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Go For a Walk","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],
                    "sat":[],
                    "sun":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Buy Toilet Paper","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Go For a Walk","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}]}
                ,{"projectname":"The Tespian",
                    "mon":[{"taskname":"Mow the lawn","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "tue":[{"taskname":"Mow the lawn","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "wed":[{"taskname":"Mow the lawn","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "thr":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],"fri":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],
                    "sat":[],
                    "sun":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}]
                }
            ]

const jumong = [
                {"projectname":"Hall-Mart",
                    "mon":[{"taskname":"Organise Marketing","times":["12am-1pm","3pm-10pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["12am-1pm","3pm-10pm","3pm-10pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "tue":[{"taskname":"Organise Marketing","times":["12pm-1pm","3pm-10pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm","3pm-10pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "wed":[{"taskname":"Entire Planning","times":["3am-7pm","11pm-5am","3pm-10pm"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am","3pm-10pm"]}]},{"taskname":"Check the Entire Work","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Organise Marketing","times":["10am-12am","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],                    
                }
                ,{"projectname":"Mark-47",
                    "mon":[{"taskname":"Edit the Iron-Man Suite","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "tue":[{"taskname":"Edit the Iron-Man Suite","times":["12pm-1pm","8am-3pm","8am-3pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "wed":[{"taskname":"Edit the Iron-Man Suite","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "thr":[{"taskname":"Shower the baby","times":["9am-10am","10am-11am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Buy Toilet Paper","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Go For a Walk","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],
                    "fri":[{"taskname":"Shower the baby","times":["8am-9am","9am-10am","10am-11am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Buy Toilet Paper","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Go For a Walk","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],
                    "sat":[],
                    "sun":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Buy Toilet Paper","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]},{"taskname":"Go For a Walk","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}]
                }
                ,{"projectname":"The Tespian",
                    "mon":[{"taskname":"Mow the lawn","times":["12pm-1pm","3pm-10pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "tue":[{"taskname":"Mow the lawn","times":["12pm-1pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "wed":[{"taskname":"Mow the lawn","times":["12pm-1pm","3pm-10pm","3pm-10pm"],"subtasks":[{"subtaskname":"Wet the grass","startdate":"6/7/2021","enddate":"2/8/2022","days":["sat","tue","sun"],"times":["2am-11pm","13pm-09pm"]},{"subtaskname":"Trim the blades","startdate":"1/9/2021","enddate":"03/6/2022","days":["thr","fri","sun"],"times":["12pm-1pm","3pm-10pm","17pm-01pm"]}]}],
                    "thr":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],"fri":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}],
                    "sat":[],
                    "sun":[{"taskname":"Shower the baby","times":["3am-7pm","11pm-5am","11pm-5am"],"subtasks":[{"subtaskname":"Wake the baby up","startdate":"3/5/2022","enddate":"9/7/2022","days":["sat","tue","sun"],"times":["6am-16am"]}]}]
                }
            ]

const sortTimeOfTheDay = (/* validProjectsWithTasksAndDays */jumong) => {

    
    let newProjectsCollection = []

    jumong.forEach((project, projectIndex)=>{
        newProjectsCollection.push({'projectname': project.projectname, // creates a project instance
        'mon':[],'tue':[],'wed':[],
        'thr':[],'fri':[],'sat':[],
        'sun':[]})

        project.mon.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                    if(time.includes('am')){
                        //validProjectsWithTasksAndDays.mon.task.splice(task,0, 0)
                        newProjectsCollection[projectIndex].mon.push([time, subtask.subtaskname, day.taskname])
                    } 
                })

                subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                    if(time.includes('pm')){
                        newProjectsCollection[projectIndex].mon.push([time, subtask.subtaskname, day.taskname])
                    } 
                })
                
            })

        })

        project.tue.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                    if(time.includes('am')){
                        newProjectsCollection[projectIndex].tue.push([time, subtask.subtaskname, day.taskname])
                    } 
                })

                subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                    if(time.includes('pm')){
                        newProjectsCollection[projectIndex].tue.push([time, subtask.subtaskname, day.taskname])
                    } 
                })
                
            })

        })

        project.wed.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                    if(time.includes('am')){
                        newProjectsCollection[projectIndex].wed.push([time, subtask.subtaskname, day.taskname])
                    } 
                })

                subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                    if(time.includes('pm')){
                        newProjectsCollection[projectIndex].wed.push([time, subtask.subtaskname, day.taskname])
                    } 
                })
                
            })

        }) 

        project.thr.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                    if(time.includes('am')){
                        newProjectsCollection[projectIndex].thr.push([time, subtask.subtaskname, day.taskname])
                    } 
                })

                subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                    if(time.includes('pm')){
                        newProjectsCollection[projectIndex].thr.push([time, subtask.subtaskname, day.taskname])
                    } 
                })
                
            })

        }) 

        project.fri.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                    if(time.includes('am')){
                        newProjectsCollection[projectIndex].fri.push([time, subtask.subtaskname, day.taskname])
                    } 
                })

                subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                    if(time.includes('pm')){
                        newProjectsCollection[projectIndex].fri.push([time, subtask.subtaskname, day.taskname])
                    } 
                })
                
            })

        }) 

        project.sat.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                    if(time.includes('am')){
                        newProjectsCollection[projectIndex].sat.push([time, subtask.subtaskname, day.taskname])
                    } 
                })

                subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                    if(time.includes('pm')){
                        newProjectsCollection[projectIndex].sat.push([time, subtask.subtaskname, day.taskname])
                    } 
                })
                
            })

        }) 

        project.sun.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                    if(time.includes('am')){
                        newProjectsCollection[projectIndex].sun.push([time, subtask.subtaskname, day.taskname])
                    } 
                })

                subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                    if(time.includes('pm')){
                        newProjectsCollection[projectIndex].sun.push([time, subtask.subtaskname, day.taskname])
                    } 
                })
                
            })

        }) 
        

    }) //end of validate project for each   

    //console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection[0])) 
    //console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection[1])) 
    //console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection[2]))  
    //console.log('newProjectsCollection: '+JSON.stringify(validProjectsWithTasksAndDays[1]))
        return newProjectsCollection
}//end of sortTimeOfTheDay
/* const projects= {
    project:{
        projectname:'jumong',
        days:{
            mon:[
                ['8am', 'taskA', 'subtaskA'],
                ['2pm', 'taskB', 'subtaskA', 'subtaskB'],
                ['2pm', 'taskE', 'subtaskA', 'subtaskB', 'subtaskC']
            ],
            tue:[
                ['8am', 'taskA', 'subtaskA'],
                ['1pm', 'taskA', 'subtaskA', 'subtaskB'],
                ['4pm', 'taskA', 'subtaskA', 'subtaskB', 'subtaskC']
            ]
        },
    },
    project:{
        projectname:'juniper',
        days:{
            mon:[
                ['8am', 'taskA', 'subtaskA'],
                ['2pm', 'taskB', 'subtaskA', 'subtaskB'],
                ['2pm', 'taskE', 'subtaskA', 'subtaskB', 'subtaskC']
            ],
            tue:[
                ['8am', 'taskA', 'subtaskA'],
                ['1pm', 'taskA', 'subtaskA', 'subtaskB'],
                ['4pm', 'taskA', 'subtaskA', 'subtaskB', 'subtaskC']
            ]
        },
    }
}
 */
    