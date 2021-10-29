import { getRequest } from './api'


export const sortedProjects = async ()=> {
    var read
    return read = getRequest()
    .then((responseJson) => {
        console.log(responseJson)
        var read
        return read = sortProjects(responseJson)
      })
      .catch((error) => {
        console.error(error);
      });    
      /* var read
      return read = sortProjects(mangekyou)*/
}


const sortProjects = async (data) => {
    const validProjects = validateProjects(data)
    const validProjectsWithTasks = validateTasks(validProjects)
    const validProjectsWithTasksAndDays = sortDaysOfTheWeek(validProjectsWithTasks)
    //const validProjectsWithTasksAndDaysAndTimeOfDayAmPm = sortTimeIntoAmPm(validProjectsWithTasksAndDays)
    const validProjectsWithTasksAndDaysAndTimeOfDay = sortTimeAndTask(validProjectsWithTasksAndDays)

    const validProjectsWithTasksAndDaysAndTimeOfDayAndReorderedTime = reorderTheTimeInAsendingOrder(validProjectsWithTasksAndDaysAndTimeOfDay)

    const V_P_T_D_T_R_AndFreeTime = sortForFreeTime(validProjectsWithTasksAndDaysAndTimeOfDayAndReorderedTime)
    const V_P_T_D_T_R_F_AndAllProjects = createAndAddAllProjects(V_P_T_D_T_R_AndFreeTime)
    //creatAndAddAllFreeTime(validProjectsWithTasksAndDays)

    //console.log('validProjectsWithTasksAndDaysAndTimeOfDay:' +JSON.stringify(validProjectsWithTasksAndDaysAndTimeOfDay))
    //console.log('V_P_T_D_T_R_F_AndAllProjects:' +JSON.stringify(V_P_T_D_T_R_F_AndAllProjects[4]))

    return V_P_T_D_T_R_F_AndAllProjects


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
        console.log('tasks: '+tasks)

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
/* const sortTimeIntoAmPm = (validProjectsWithTasksAndDays) =>{
    
    let newProjectsCollection = []

    jumong.forEach((project, projectIndex)=>{
        newProjectsCollection.push({'projectname': project.projectname, // creates a project instance
        'mon':[],'tue':[],'wed':[],
        'thr':[],'fri':[],'sat':[],
        'sun':[]})

        project.mon.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                    const timeHolder = time
                    const timeSplit = timeHolder.split('-')
                    let timeRecorrect1 = ''

                    timeSplitZeroSplit = timeSplit[0].split(':')
                    
                    if(timeSplit[0] = '00:00' && timeSplit[0] <= '00:59'){ //00:00 equivalent to 12 am
                        timeRecorrect1 = timeSplitZeroSplit[1] + 'am' 
                    }
                    else if(timeSplit[0] >= '01:00' && timeSplit[0] <= '11:59'){
                        timeRecorrect1 = timeSplit[0] + 'am' 
                    } 
                    else if(timeSplit[0] >= '12:00' && timeSplit[0] <= '12:59'){//12:00 equivalent to 12 pm
                        timeRecorrect1 = timeSplit[0] + 'am' 
                    } 
                    else if(timeSplit[0] >= '13:00' && timeSplit[0] <= '23:59'){
                        timeRecorrect1 = timeSplit[0] + 'am' 
                    } 

                })

                
                
            })

        })

    }) //end of validate project for each   

    console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection[0])) 
    //console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection[1])) 
    //console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection[2]))  
    //console.log('newProjectsCollection: '+JSON.stringify(validProjectsWithTasksAndDays[1]))
        return newProjectsCollection
}
 */





const sortTimeAndTask = (/* validProjectsWithTasksAndDays */jumong) => {

    //console.log('jumonging: '+JSON.stringify(jumong))
    let newProjectsCollection = []

    jumong.forEach((project, projectIndex)=>{
        newProjectsCollection.push({'projectname': project.projectname, // creates a project instance
        'mon':[],'tue':[],'wed':[],
        'thr':[],'fri':[],'sat':[],
        'sun':[]})

        project.mon.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.                    
                        newProjectsCollection[projectIndex].mon.push([time, subtask.subtaskname, day.taskname, project.projectname])
                })
                
            })

        })

        project.tue.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                        newProjectsCollection[projectIndex].tue.push([time, subtask.subtaskname, day.taskname, project.projectname])
                })
                
            })

        })

        project.wed.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                        newProjectsCollection[projectIndex].wed.push([time, subtask.subtaskname, day.taskname, project.projectname])
                })
                
            })

        }) 

        project.thr.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                        newProjectsCollection[projectIndex].thr.push([time, subtask.subtaskname, day.taskname, project.projectname])
                })
                
            })

        }) 

        project.fri.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                        newProjectsCollection[projectIndex].fri.push([time, subtask.subtaskname, day.taskname, project.projectname])
                })
                
            })

        }) 

        project.sat.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                        newProjectsCollection[projectIndex].sat.push([time, subtask.subtaskname, day.taskname, project.projectname])
                })
                
            })

        }) 

        project.sun.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

            day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
                subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                        newProjectsCollection[projectIndex].sun.push([time, subtask.subtaskname, day.taskname, project.projectname])
                })
                
            })

        }) 
        

    }) //end of validate project for each   

    console.log('newProjectsCollection SortTimeAndTask: '+JSON.stringify(newProjectsCollection)) 
        return newProjectsCollection
}//end of sortTimeOfTheDay

const reorderTheTimeInAsendingOrder = (validProjectsWithTasksAndDays) =>{

  let newProjectsCollection = []
    validProjectsWithTasksAndDays.forEach((project, projectIndex)=>{
        newProjectsCollection.push({'projectname': project.projectname, // creates a project instance
        'mon':[],'tue':[],'wed':[],
        'thr':[],'fri':[],'sat':[],
        'sun':[]})

        let newArray = []

        project.mon.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
            //const arraying = [ [7,2,3], [4,3,5,6], [0,1,9],[0,5,8] ] 
            //const newArrayForLarge = []
            //console.log('dayElement Particular:' +JSON.stringify(dayElement))
            
            const holder = dayElement[0]
            const split = holder.split('-')

            newArray.push(split[0])
            //console.log('newArray:' +newArray)
        })   
            
        newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
        //console.log('newArray after sorting:' +newArray)

        project.mon.forEach((dayElementInside, index)=> {
          const holder = dayElementInside[0]
          const split = holder.split('-')

            newProjectsCollection[projectIndex].mon[newArray.indexOf(split[0])] = dayElementInside
        })    
        //console.log('newArrayForLarge:' +JSON.stringify(newProjectsCollection) )

//Monday Ends

        newArray = []
        project.tue.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
          //console.log('dayElement Particular:' +JSON.stringify(dayElement))
          
          const holder = dayElement[0]
          const split = holder.split('-')

          newArray.push(split[0])
          //console.log('newArray:' +newArray)
        })   
            
        newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
        //console.log('newArray after sorting:' +newArray)

        project.tue.forEach((dayElementInside, index)=> {
          const holder = dayElementInside[0]
          const split = holder.split('-')

            newProjectsCollection[projectIndex].tue[newArray.indexOf(split[0])] = dayElementInside
        })    
        //console.log('newArrayForLarge:' +JSON.stringify(newProjectsCollection) )


//Tuesday Ends

        newArray = []
        project.wed.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
          //console.log('dayElement Particular In Wed:' +JSON.stringify(dayElement))
          
          const holder = dayElement[0]
          const split = holder.split('-')

          newArray.push(split[0])
          //console.log('newArray:' +newArray)

        })   
            
        newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
        //console.log('newArray after sorting:' +newArray)

        project.wed.forEach((dayElementInside, index)=> {
          const holder = dayElementInside[0]
          const split = holder.split('-')

            newProjectsCollection[projectIndex].wed[newArray.indexOf(split[0])] = dayElementInside
        })    
        //console.log('newArrayForLarge:' +JSON.stringify(newProjectsCollection) )


//Wednesday Ends

        newArray = []
        project.thr.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
            //console.log('dayElement Particular In Thursday:' +JSON.stringify(dayElement))
            
            const holder = dayElement[0]
            const split = holder.split('-')

            newArray.push(split[0])
            console.log('newArray:' +newArray)
        })   
            
        newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
        console.log('newArray after sorting:' +newArray)

        project.thr.forEach((dayElementInside, index)=> {
          const holder = dayElementInside[0]
          const split = holder.split('-')

            newProjectsCollection[projectIndex].thr[newArray.indexOf(split[0])] = dayElementInside
        })    
        console.log('newArrayForLarge:' +JSON.stringify(newProjectsCollection) )


//Thursday Ends

      newArray = []
      project.fri.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
          //console.log('dayElement Particular:' +JSON.stringify(dayElement))
          
          const holder = dayElement[0]
          const split = holder.split('-')

          newArray.push(split[0])
          //console.log('newArray:' +newArray)
      })   
          
      newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
      //console.log('newArray after sorting:' +newArray)

      project.fri.forEach((dayElementInside, index)=> {
        const holder = dayElementInside[0]
        const split = holder.split('-')

          newProjectsCollection[projectIndex].fri[newArray.indexOf(split[0])] = dayElementInside
      })    
      //console.log('newArrayForLarge:' +JSON.stringify(newProjectsCollection) )


//Friday Ends

      newArray = []
      project.sat.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        //console.log('dayElement Particular:' +JSON.stringify(dayElement))
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
      })   
        
      newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
      //console.log('newArray after sorting:' +newArray)

      project.sat.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

        newProjectsCollection[projectIndex].sat[newArray.indexOf(split[0])] = dayElementInside
      })    
      //console.log('newArrayForLarge:' +JSON.stringify(newProjectsCollection) )


//Saturday Ends

      newArray = []
      project.sun.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        //console.log('dayElement Particular:' +JSON.stringify(dayElement))
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
      })   
        
      newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
      //console.log('newArray after sorting:' +newArray)

      project.sun.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

        newProjectsCollection[projectIndex].sun[newArray.indexOf(split[0])] = dayElementInside
      })    
      //console.log('newArrayForLarge:' +JSON.stringify(newProjectsCollection) )

      }) //end of validate project for each   

      //console.log('newProjectsCollection reorderTheTimeInAsendingOrder: '+JSON.stringify(newProjectsCollection)) 
        return newProjectsCollection
}//end of reorderTheTimeInAsendingOrder



const sortForFreeTime = (validProjectsWithAllSoFar) => {

  validProjectsWithAllSoFar.forEach((project, projectIndex)=>{

    for( let taskIndex = 0; taskIndex < (project.mon.length -1); taskIndex++){ //check inside th monday inside the given project
      const holder = project.mon[taskIndex][0]
      const split = holder.split('-')

      const holder2 = project.mon[taskIndex + 1][0]
      const split2 = holder2.split('-')  

      if (split[1] !== split2[0]){
        let newInsertion = [split[1] +'-'+ split2[0], 'Free', 'Free']
        project.mon.splice((taskIndex + 1), 0, newInsertion)
        taskIndex = taskIndex + 1
      }
    }//End of Monday

    for( let taskIndex = 0; taskIndex < (project.tue.length -1); taskIndex++){ //check inside th monday inside the given project
      const holder = project.tue[taskIndex][0]
      const split = holder.split('-')

      const holder2 = project.tue[taskIndex + 1][0]
      const split2 = holder2.split('-')  

      if (split[1] !== split2[0]){
        let newInsertion = [split[1] +'-'+ split2[0], 'Free', 'Free']
        project.tue.splice((taskIndex + 1), 0, newInsertion)
        taskIndex = taskIndex + 1
      }
    }//End of Tuesday


    for( let taskIndex = 0; taskIndex < (project.wed.length -1); taskIndex++){ //check inside th monday inside the given project
      if((project.wed[taskIndex] !== undefined) && (project.wed[taskIndex + 1] !== undefined)){
        const holder = project.wed[taskIndex][0]
        const split = holder.split('-')

        const holder2 = project.wed[taskIndex + 1][0]
        const split2 = holder2.split('-')  

        if (split[1] !== split2[0]){
          let newInsertion = [split[1] +'-'+ split2[0], 'Free', 'Free']
          project.wed.splice((taskIndex + 1), 0, newInsertion)
          taskIndex = taskIndex + 1
        }
      }
    }//End of Wednesday


    for( let taskIndex = 0; taskIndex < (project.thr.length -1); taskIndex++){ //check inside th monday inside the given project
      if((project.thr[taskIndex] !== undefined) && (project.thr[taskIndex + 1] !== undefined)){
        const holder = project.thr[taskIndex][0]
        const split = holder.split('-')

        const holder2 = project.thr[taskIndex + 1][0]
        const split2 = holder2.split('-')  

        if (split[1] !== split2[0]){
          let newInsertion = [split[1] +'-'+ split2[0], 'Free', 'Free']
          project.thr.splice((taskIndex + 1), 0, newInsertion)
          taskIndex = taskIndex + 1
        }
      }
    }//End of Thursday


    for( let taskIndex = 0; taskIndex < (project.fri.length -1); taskIndex++){ //check inside th monday inside the given project
      if((project.fri[taskIndex] !== undefined) && (project.fri[taskIndex + 1] !== undefined)){
        const holder = project.fri[taskIndex][0]
        const split = holder.split('-')

        const holder2 = project.fri[taskIndex + 1][0]
        const split2 = holder2.split('-')  

        if (split[1] !== split2[0]){
          let newInsertion = [split[1] +'-'+ split2[0], 'Free', 'Free']
          project.fri.splice((taskIndex + 1), 0, newInsertion)
          taskIndex = taskIndex + 1
        }
      }
    }//End of Friday


    for( let taskIndex = 0; taskIndex < (project.sat.length -1); taskIndex++){ //check inside th monday inside the given project
      if((project.sat[taskIndex] !== undefined) && (project.sat[taskIndex + 1] !== undefined)){
        const holder = project.sat[taskIndex][0]
        const split = holder.split('-')

        const holder2 = project.sat[taskIndex + 1][0]
        const split2 = holder2.split('-')  

        if (split[1] !== split2[0]){
          let newInsertion = [split[1] +'-'+ split2[0], 'Free', 'Free']
          project.sat.splice((taskIndex + 1), 0, newInsertion)
          taskIndex = taskIndex + 1
        }
      }
    }//End of Saturday


    for( let taskIndex = 0; taskIndex < (project.sun.length -1); taskIndex++){ //check inside th monday inside the given project
      if((project.sun[taskIndex] !== undefined) && (project.sun[taskIndex + 1] !== undefined)){
        const holder = project.sun[taskIndex][0]
        const split = holder.split('-')

        const holder2 = project.sun[taskIndex + 1][0]
        const split2 = holder2.split('-')  

        if (split[1] !== split2[0]){
          let newInsertion = [split[1] +'-'+ split2[0], 'Free', 'Free']
          project.sun.splice((taskIndex + 1), 0, newInsertion)
          taskIndex = taskIndex + 1
        }
      }
    }
  })

  //console.log('validProjectsWithAllSoFar: '+JSON.stringify(validProjectsWithAllSoFar))
  return validProjectsWithAllSoFar 
}//end of sortForFreeTime

const createAndAddAllProjects = (V_P_T_D_T_R_AndFreeTime) =>{
  let AllProjectsCombined = [{'projectname': 'All Projects', // creates All Project
  'mon':[],'tue':[],'wed':[],
  'thr':[],'fri':[],'sat':[],
  'sun':[]}] 

  let AllFreeTimesCombined = [{'projectname': 'Free', // creates Free Times
  'mon':[],'tue':[],'wed':[],
  'thr':[],'fri':[],'sat':[],
  'sun':[]}] 


  //Creating all Projects combinations
  V_P_T_D_T_R_AndFreeTime.forEach((project, projectIndex)=>{
    AllProjectsCombined[0].mon = [...new Set([...AllProjectsCombined[0].mon,...project.mon])]
    AllProjectsCombined[0].tue = [...new Set([...AllProjectsCombined[0].mon,...project.tue])]    
    AllProjectsCombined[0].wed = [...new Set([...AllProjectsCombined[0].wed,...project.wed])]
    AllProjectsCombined[0].thr = [...new Set([...AllProjectsCombined[0].thr,...project.thr])]
    AllProjectsCombined[0].fri = [...new Set([...AllProjectsCombined[0].fri,...project.fri])]
    AllProjectsCombined[0].sat = [...new Set([...AllProjectsCombined[0].sat,...project.sat])]
    AllProjectsCombined[0].sun = [...new Set([...AllProjectsCombined[0].sun,...project.sun])]    
  })
  
  console.log('AllProjects Before Arrangement: '+JSON.stringify(AllProjectsCombined)) 

  //Rearranging all Projects combinations
  V_P_T_D_T_R_AndFreeTime.forEach((project, projectIndex)=>{
    let newArray = []

    project.mon.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
        if(dayElement[1] == 'Free'){
          AllFreeTimesCombined[0].mon.push(dayElement) //Adding all the elements to Add to the Free Array
        }
        
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.mon.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      V_P_T_D_T_R_AndFreeTime[projectIndex].mon[newArray.indexOf(split[0])] = dayElementInside
    }) 
    //End of Monday

    newArray = []
    project.tue.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
        if(dayElement[1] == 'Free'){
          AllFreeTimesCombined[0].tue.push(dayElement) //Adding all the elements to Add to the Free Array
        }
        
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.tue.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      V_P_T_D_T_R_AndFreeTime[projectIndex].tue[newArray.indexOf(split[0])] = dayElementInside
    })
    //End of Tuesday


    newArray = []
    project.wed.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
        if(dayElement[1] == 'Free'){
          AllFreeTimesCombined[0].wed.push(dayElement) //Adding all the elements to Add to the Free Array
        }
        
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.wed.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      V_P_T_D_T_R_AndFreeTime[projectIndex].wed[newArray.indexOf(split[0])] = dayElementInside
    })
    //End of Wednesday


    newArray = []
    project.thr.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
        if(dayElement[1] == 'Free'){
          AllFreeTimesCombined[0].thr.push(dayElement) //Adding all the elements to Add to the Free Array
        }
        
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.thr.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      V_P_T_D_T_R_AndFreeTime[projectIndex].thr[newArray.indexOf(split[0])] = dayElementInside
    })
    //End of Thursday


    newArray = []
    project.fri.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
        if(dayElement[1] == 'Free'){
          AllFreeTimesCombined[0].fri.push(dayElement) //Adding all the elements to Add to the Free Array
        }
        
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.fri.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      V_P_T_D_T_R_AndFreeTime[projectIndex].fri[newArray.indexOf(split[0])] = dayElementInside
    })
    //End of Friday


    newArray = []
    project.sat.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
        if(dayElement[1] == 'Free'){
          AllFreeTimesCombined[0].sat.push(dayElement) //Adding all the elements to Add to the Free Array
        }
        
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.sat.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      V_P_T_D_T_R_AndFreeTime[projectIndex].sat[newArray.indexOf(split[0])] = dayElementInside
    })
    //End of Saturday


    newArray = []
    project.sun.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
        if(dayElement[1] == 'Free'){
          AllFreeTimesCombined[0].sun.push(dayElement) //Adding all the elements to Add to the Free Array
        }
        
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.sun.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      V_P_T_D_T_R_AndFreeTime[projectIndex].sun[newArray.indexOf(split[0])] = dayElementInside
    })
    //End of Sunday

    console.log('AllProjects After Arrangement: '+JSON.stringify(AllProjectsCombined)) 
  })

  console.log('AllFreeTimesCombined: '+JSON.stringify(AllFreeTimesCombined)) 

  //Adding all Projects to the Main Array
  V_P_T_D_T_R_AndFreeTime.splice(0, 0, AllProjectsCombined[0])

  console.log('V_P_T_D_T_R_AndFreeTime: '+JSON.stringify(V_P_T_D_T_R_AndFreeTime))



  //Rearranging all Free times combinations
  AllFreeTimesCombined.forEach((project, projectIndex)=>{
    let newArray = []

    project.mon.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.mon.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      AllFreeTimesCombined[projectIndex].mon[newArray.indexOf(split[0])] = dayElementInside
    }) 
    //End of Monday

    
    newArray = []
    project.tue.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.tue.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      AllFreeTimesCombined[projectIndex].tue[newArray.indexOf(split[0])] = dayElementInside
    }) 
    //End of Tuesday
    
    
    newArray = []
    project.wed.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.wed.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      AllFreeTimesCombined[projectIndex].wed[newArray.indexOf(split[0])] = dayElementInside
    }) 
    //End of Wednesday
    
    newArray = []
    project.thr.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.thr.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      AllFreeTimesCombined[projectIndex].thr[newArray.indexOf(split[0])] = dayElementInside
    }) 
    //End of Thursday
    
    newArray = []
    project.fri.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.fri.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      AllFreeTimesCombined[projectIndex].fri[newArray.indexOf(split[0])] = dayElementInside
    }) 
    //End of Friday
    
    newArray = []
    project.sat.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.sat.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      AllFreeTimesCombined[projectIndex].sat[newArray.indexOf(split[0])] = dayElementInside
    }) 
    //End of Saturday
    
    newArray = []
    project.sun.forEach((dayElement, taskIndex)=>{ //check inside th monday inside the given project
        
        const holder = dayElement[0]
        const split = holder.split('-')

        newArray.push(split[0])
        //console.log('newArray:' +newArray)
    })   
        
    newArray.sort((a,b)=> { return new Date('1970-01-01T' +a) - new Date('1970-01-01T' +b)})   
    //console.log('newArray after sorting:' +newArray)

    project.sun.forEach((dayElementInside, index)=> {
      const holder = dayElementInside[0]
      const split = holder.split('-')

      AllFreeTimesCombined[projectIndex].sun[newArray.indexOf(split[0])] = dayElementInside
    }) 
    //End of Sunday

    //console.log('AllFreeTimes After Arrangement: '+JSON.stringify(AllFreeTimesCombined)) 
  })

  
  V_P_T_D_T_R_AndFreeTime.push(AllFreeTimesCombined[0])
  //console.log('V_P_T_D_T_R_AndFreeTime The Last: '+JSON.stringify(V_P_T_D_T_R_AndFreeTime[4])) 

  return V_P_T_D_T_R_AndFreeTime
}
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





/* const sortTimeOfTheDay = (validProjectsWithTasksAndDays / jumong) => {

  //console.log('jumonging: '+JSON.stringify(jumong))
  let newProjectsCollection = []

  jumong.forEach((project, projectIndex)=>{
      newProjectsCollection.push({'projectname': project.projectname, // creates a project instance
      'mon':[],'tue':[],'wed':[],
      'thr':[],'fri':[],'sat':[],
      'sun':[]})

      project.mon.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

          day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
              subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                  if(time.includes('AM')){
                      //validProjectsWithTasksAndDays.mon.task.splice(task,0, 0)
                      newProjectsCollection[projectIndex].mon.push([time, subtask.subtaskname, day.taskname])
                  } 
              })

              subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                  if(time.includes('PM')){
                      newProjectsCollection[projectIndex].mon.push([time, subtask.subtaskname, day.taskname])
                  } 
              })
              
          })

      })

      project.tue.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

          day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
              subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                  if(time.includes('AM')){
                      newProjectsCollection[projectIndex].tue.push([time, subtask.subtaskname, day.taskname])
                  } 
              })

              subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                  if(time.includes('PM')){
                      newProjectsCollection[projectIndex].tue.push([time, subtask.subtaskname, day.taskname])
                  } 
              })
              
          })

      })

      project.wed.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

          day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
              subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                  if(time.includes('AM')){
                      newProjectsCollection[projectIndex].wed.push([time, subtask.subtaskname, day.taskname])
                  } 
              })

              subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                  if(time.includes('PM')){
                      newProjectsCollection[projectIndex].wed.push([time, subtask.subtaskname, day.taskname])
                  } 
              })
              
          })

      }) 

      project.thr.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

          day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
              subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                  if(time.includes('AM')){
                      newProjectsCollection[projectIndex].thr.push([time, subtask.subtaskname, day.taskname])
                  } 
              })

              subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                  if(time.includes('PM')){
                      newProjectsCollection[projectIndex].thr.push([time, subtask.subtaskname, day.taskname])
                  } 
              })
              
          })

      }) 

      project.fri.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

          day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
              subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                  if(time.includes('AM')){
                      newProjectsCollection[projectIndex].fri.push([time, subtask.subtaskname, day.taskname])
                  } 
              })

              subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                  if(time.includes('PM')){
                      newProjectsCollection[projectIndex].fri.push([time, subtask.subtaskname, day.taskname])
                  } 
              })
              
          })

      }) 

      project.sat.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

          day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
              subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                  if(time.includes('AM')){
                      newProjectsCollection[projectIndex].sat.push([time, subtask.subtaskname, day.taskname])
                  } 
              })

              subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                  if(time.includes('PM')){
                      newProjectsCollection[projectIndex].sat.push([time, subtask.subtaskname, day.taskname])
                  } 
              })
              
          })

      }) 

      project.sun.forEach((day, taskIndex)=>{ //check inside th monday inside the given project

          day.subtasks.forEach((subtask,timeIndex)=>{ //check inside each day of the project, specifically the subtask
              subtask.times.forEach((time,x)=>{ //inside the times part of it for the A.M.
                  if(time.includes('Am')){
                      newProjectsCollection[projectIndex].sun.push([time, subtask.subtaskname, day.taskname])
                  } 
              })

              subtask.times.forEach((time,x)=>{ //inside the times part of it for P.M.
                  if(time.includes('Pm')){
                      newProjectsCollection[projectIndex].sun.push([time, subtask.subtaskname, day.taskname])
                  } 
              })
              
          })

      }) 
      

  }) //end of validate project for each   

  console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection)) 
  //console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection[1])) 
  //console.log('newProjectsCollection: '+JSON.stringify(newProjectsCollection[2]))  
  //console.log('newProjectsCollection: '+JSON.stringify(validProjectsWithTasksAndDays[1]))
      return newProjectsCollection
} */
//end of sortTimeOfTheDay