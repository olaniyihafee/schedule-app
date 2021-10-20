export function generateWeeks(arrayToCheck) {

    const placeholderString = arrayToCheck
    const output = placeholderString.split(' ')
    //console.log('first Part: ' +output[0])

    switch(output[0]){
        case"Sun":
            return (
      
                <div className="Weeks-Headings-Container"> 
                    <ul className="Tasks-Headings-ul" >
                        <li className="W-H-C-SunAndSat">S</li><li>M</li><li>T</li><li>W</li><li>T</li><li>F</li>
                        <li className="W-H-C-SunAndSat">S</li>
                    </ul>
                </div>
        
            ) 
            break;
        case"Mon":
            return (
      
                <div className="Weeks-Headings-Container"> 
                    <ul className="Tasks-Headings-ul" >
                        <li>M</li><li>T</li><li>W</li><li>T</li><li>F</li>
                        <li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li>
                    </ul>
                </div>
        
            ) 
            break;
        case"Tue":
            return (
      
                <div className="Weeks-Headings-Container"> 
                    <ul className="Tasks-Headings-ul" >
                        <li>T</li><li>W</li><li>T</li><li>F</li>
                        <li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li><li>M</li>
                    </ul>
                </div>
        
            ) 
            break;
        case"Wed":
                return (
          
                    <div className="Weeks-Headings-Container"> 
                        <ul className="Tasks-Headings-ul" >
                            <li>W</li><li>T</li><li>F</li>
                            <li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li><li>M</li><li>T</li>
                        </ul>
                    </div>
            
                ) 
                break;
        case"Thu":
                return (
        
                    <div className="Weeks-Headings-Container"> 
                        <ul className="Tasks-Headings-ul" >
                            <li>T</li><li>F</li><li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li>
                            <li>M</li><li>T</li><li>W</li>
                        </ul>
                    </div>
            
                ) 
                break;
        case"Fri":
                return (
        
                    <div className="Weeks-Headings-Container"> 
                        <ul className="Tasks-Headings-ul" >
                            <li>F</li><li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li>
                            <li>M</li><li>T</li><li>W</li><li>T</li>
                        </ul>
                        <hr className="Horizontal-Line"></hr>
                    </div>
            
                ) 
                break;
        case "Sat":
                return (
        
                    <div className="Weeks-Headings-Container"> 
                        <ul className="Tasks-Headings-ul" >
                            <li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li>
                            <li>M</li><li>T</li><li>W</li><li>T</li><li>F</li>
                        </ul>
                    </div>
            
                ) 
                break;
    }//end switch
    
  }//end function


const setBordersRed =()=>{
    
}

export const emptyProjectNameOrDate =(index, e, inputMain, inputOthers, setInputOthersList, setProjectError)=>{
    
    console.log('it entered inside Main jumong Changes')
    if( inputMain[0].projectname == ''){
    
        console.log('it entered inside Main jumong Changes')
        const { name, value } = e.target;

        //console.log('This is the List name: '+name)
        const list = [...inputOthers];
        list[index][name] = '';

        setProjectError('Project Name is Empty')
        setInputOthersList(list);
    } 
}
export const emptySubTaskNameOrDate =(index, index2, e, inputOthers, setInputOthersList, setTaskError)=>{
    
    console.log('it entered inside Main jumong Changes')
    if( inputOthers[index].taskname == ''){
    
        console.log('it entered inside Main Changes')
    const { name, value } = e.target;


    console.log('This is the List name: '+name)
    const list = [...inputOthers];
    list[index].subtask[index2][name] = '';

    setTaskError('Task Name is Empty')
    setInputOthersList(list);

    }
}

export const outOfProjectSpan =(index, e, inputMain, inputOthers, setInputOthersList, setProjectError)=>{
    
    const { name, value } = e.target;

    if (name == 'startdate' || 'enddate'){

        const startdate = inputOthers[index].startdate
        const enddate = inputOthers[index].enddate

        const startDateExclusion = (inputMain[0].startdate >= startdate) || ((inputMain[0].startdate) == '') || (startdate <= enddate)
        const endDateExclusion = (inputMain[0].enddate <= enddate) || ((inputMain[0].enddate) == '') || (startdate >= enddate)
        
        if (name == 'startdate'){
            if(startDateExclusion){
                const list = [...inputOthers];
                list[index][name] = '';
    
                setProjectError('Project Dates are either empty or the Task Date is out of Bound')
                setInputOthersList(list);
            }
        }

        else if (name == 'enddate'){
            if(endDateExclusion){
                const list = [...inputOthers];
                list[index][name] = '';
    
                setProjectError('Project Dates are either empty or the Task Date is out of Bound')
                setInputOthersList(list);
            }
        }
    }

}

export const checkForIncompletePrerequisiteInProject =(e, index, inputMain, setInputMainList, setProjectError)=>{
    const { name, value } = e.target;

    const oneOfTheDays = ('sun' || 'mon' || 'tue' || 'wed' || 'thu' || 'fri' || 'sat')

    const  dailyCondition = ( ( name == oneOfTheDays) && 
    (((inputMain[0].startdate || inputMain[0].enddate) == '' ) || ( inputMain[0].projectname == '')) )

    const startAndEndDateCondition = (name == 'startdate' || 'enddate' || oneOfTheDays ) && ( inputMain[0].projectname == '')

    if(startAndEndDateCondition){
        //console.log('This is the List name: '+name)
        const list = [...inputMain];
        list[index][name] = '';

        setProjectError('Project Name is Empty')
        setInputMainList(list);
    }
    if(dailyCondition){
        //console.log('This is the List name: '+name)
        const list = [...inputMain];
        list[index][name] = '';

        setProjectError('Start Date or End Date is Empty')
        setInputMainList(list);
    } 
}
export const checkForIncompletePrerequisiteInTask =(e, index, inputOthers, setInputOthersList, setTaskError)=>{
    const { name, value } = e.target;

    const oneOfTheDays = ('sun' || 'mon' || 'tue' || 'wed' || 'thu' || 'fri' || 'sat')

    const  dailyCondition = ( ( name == oneOfTheDays) && 
    (((inputOthers[index].startdate || inputOthers[index].enddate) == '' ) || ( inputOthers[index].taskname == '')) )

    const startAndEndDateCondition = (name == 'startdate' || 'enddate' || oneOfTheDays ) && ( inputOthers[index].taskname == '')

    if(startAndEndDateCondition){
        //console.log('This is the List name: '+name)
        const list = [...inputOthers];
        list[index][name] = '';

        setTaskError('Task Name is Empty')
        setInputOthersList(list);
    }
    if(dailyCondition){
        //console.log('This is the List name: '+name)
        const list = [...inputOthers];
        list[index][name] = '';

        setTaskError('Start Date or End Date is Empty')
        setInputOthersList(list);
    }
} 
/* export const checkForIncompletePrerequisiteInSubtask =()=>{
    const { name, value } = e.target;

    const  dailyCondition = ( name == 'Sun' || 'Mon' || 'Tue' || 'Wed' || 'thr' || 'Fri' || 'Sat' ) && 
    (('startdate' || 'enddate' == '' ) || ( inputMain[0].projectname == ''))

    const startAndEndDateCondition = (name == 'startdate' || 'enddate' || dailyCondition ) && ( inputMain[0].projectname == '')

    if(startAndEndDateCondition){
        //console.log('This is the List name: '+name)
        const list = [...inputOthers];
        list[index][name] = '';

        setProjectError('Task Name is Empty')
        setInputOthersList(list);
    }
    if(dailyCondition){
        //console.log('This is the List name: '+name)
        const list = [...inputOthers];
        list[index][name] = '';

        setProjectError('Start Date or End Date is Empty')
        setInputOthersList(list);
    }
} */
export const outOfTaskSpan =()=>{

}

export const coinsidingDateAndTime =(projects,times)=>{
    projects.forEach((project, projectIndex)=>{
        project.forEach((tasks, tasksIndex)=>{
            tasks.forEach((task, taskIndex)=>{
                task.forEach((subtasks, subtasksIndex)=>{
                    subtasks.forEach((subtask, subtaskIndex)=>{
                        console.log('its in the subtasks: '+subtask)
                    })
                })
            })
        })
    })

}