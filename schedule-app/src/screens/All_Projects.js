import './styles/All_Projects.css';
import './styles/Common.css';
import { getProjects } from '../otherFunctions/api'
import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AL_Progress_bar from '../components/Progress_bar/AL_Progress_bar'
import Project_Pop_up from '../components/Pop_up/Project_Pop_up';
import { saveProject } from "../otherFunctions/api"
import { placeInLocalBackUp } from "../otherFunctions/saveFunctions"
import { MdAssignment, MdSettings, MdAdd } from "react-icons/md"

function All_Projects() {

  const [ projects, setProjects ] = useState([])
  const [ data1FromPopUP, setData1FromPopUp ] = useState([])
  const [ data2FromPopUP, setData2FromPopUp ] = useState([])
  const [ data2ToPopUP, setData2ToPopUp ] = useState([])

  useEffect( async () => {

    let resultFromServer = []

   // setTimeout(async () => {
      //setAnimating(false);
      try{
        resultFromServer = await getProjects()
        //console.log('resultFromServer: '+JSON.stringify(resultFromServer) )
      }catch(error){
        console.log(error)
      }
   // }, 5000)

    if(await resultFromServer == ''){
      let resultFromLocalStorage = localStorage.getItem('projects')
      //console.log('resultFromLocalStorage: '+JSON.parse(resultFromLocalStorage))
      setProjects(projects => [].concat(JSON.parse(resultFromLocalStorage)))
    }
      
    else{
      //console.log('resultFromServer inside not null: '+JSON.stringify(resultFromServer)) 
      var Projects = resultFromServer.projects
      setProjects(projects => [].concat(Projects))
      localStorage.setItem('projects', JSON.stringify(Projects))

      let backedup = localStorage.getItem('backUpToPushOnline') 

      if(backedup !== null){
        
        let backedup = []
        backedup = localStorage.getItem('backUpToPushOnline') 
        let backedupParse = JSON.parse(backedup)

        let placeholder
        backedupParse.forEach((backupContent, index)=>{
          if(backupContent.type == 'newProjectWithoutTime'){
            placeholder.push(backupContent.body) 
          }
          else{
            
          }
          let placeholder2 = projects
          [placeholder2].concat(placeholder)
          setProjects(projects => [].concat(placeholder2))
        })
      }
    }

    /* setTimeout(async () => {
        //setAnimating(false);
        getProjects()
      }, 5000) */
  }, []) 
 
  
  const [ seen, setSeen ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ popmsg, setPopmsg ] = useState(false)

   const togglePop = () => {
     console.log(seen)
    setSeen(!seen)
   };
    
   function settingStates(List, otherList){
    setData1FromPopUp(List)
    setData2FromPopUp(otherList)
    /* const placeholder1 = data1FromPopUP[0]
    const placeholder2 = data2FromPopUP */
    const placeholder1 = List[0]
    //const placeholder2 = 
    placeholder1.tastks = [otherList]
    const combination = placeholder1

    return combination
   }

   const history = useHistory()

   const popupSubmission = async (List, otherList) => {
    console.log(List)
    console.log(otherList)
    const newProject = settingStates(List, otherList)

    const placeholder = projects
    placeholder.push(newProject)

    setProjects(projects => [].concat(placeholder))
    placeInLocalBackUp(newProject, 'newProjectWithoutTime') //backs it up before user sets all the times
    
    setTimeout(async () => {
      history.replace({pathname:"/Each_Project_Division", 
      state: {content_to_EPD_from_AP: newProject.tastks, 
        projectname: newProject.projectname, 
        firstTime: true, 
        entireProject: newProject
      }
    })
    }, 3000)

    setSeen(!seen);
    console.log('projects from popup: '+ JSON.stringify(placeholder))
    console.log('data1 From PopUp: '+ JSON.stringify(data1FromPopUP))
    console.log('data2 From PopUp: '+ JSON.stringify(data2FromPopUP))
   /*console.log(seen) */
  };

  /* const saveProject = async()=>{
    setLoading(true)
    const response = await saveProject(newProject)
    if(response == null || 'unsuccessful'){
        const backup = []
        backup = localStorage.getItem('online-backup')
        backup.push(newProject)
        localStorage.setItem('online-backup', backup)
    }
    setProjects(projects => [].concat(...newProject))
    localStorage.setItem('projects', projects)
    setLoading(false)
    setPopmsg('Project Added')

    //timeOutFunction used to transition to the each project division page after a few seconds
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'MainNavRoutes'),
      );
    }, 5000)

  }

  const editProjectCall=()=>{   
    setData2ToPopUp(toEditProject)     
    setSeen(!seen);
  }

  const editProject= async()=>{   
    setData2ToPopUp(toEditProject)     
    setSeen(!seen);

    setLoading(true)

    const editedProject = [...data1FromPopUP, ...data1FromPopUP]
    const response = await editProject(editedProject)
    if(response == null || 'unsuccessful'){
      const backup = []
      backup = localStorage.getItem('online-backup')
      backup.push(editedProject)
      localStorage.setItem('online-backup', backup)
    }

    const list = [...projects];
    list[index] = editedProject;
    setProjects(list)
    localStorage.setItem('projects', projects) 

    setLoading(false)   
    setPopmsg('Project Edited')

    //timeOutFunction used to transition to the each project division page after a few seconds
  }

  const deleteProjectCall=()=>{   
    setData2ToPopUp(toEditProject)     
    setSeen(!seen);
  }
  const deleteProject= async()=>{
    setLoading(true)
    const response = await deleteProject(deletedProject)
    if(response == null || 'unsuccessful'){
      const backup = []
      backup = localStorage.getItem('online-backup')
      backup.push(deletedProject)
      localStorage.setItem('online-backup', backup)
    }
    const list = [...projects];
    list[index] = editedProject;
    setProjects(list)
    localStorage.setItem('projects', projects) 
    setLoading(false)   
    setPopmsg('Project Deleted')
  } */
  return (

    
    
    <div className="Entire-Body">
        
        {/*the code for the popup apperance next*/}
        {seen ? <Project_Pop_up toggle={togglePop} handleSubmit={popupSubmission}/> : null}

      <div className="Heading-Container">
          <header className="h1">
            <MdAssignment className="icons"/>
            Projects
          </header>
         
          <div>
            <label className="Inline Float-Right switch">
              <input className="checkbutton" type="checkbox" onChange={()=>this.hogoromo()}/>
                <span className="slider round">
                  </span>
            </label>
          </div>
          

        <div className="Float-Right">

          <button value ="New Projects" className="Button Button-Blue" onClick={togglePop}>
            <MdAdd  className="icons"/> 
            New Projects
          </button> 

          <div className="Float-Right">
            <Link to="/Settings"> 
              <button className="Button Button-Normal">
              <MdSettings  className="icons"/> 
                Settings
              </button> 
            </Link>           
          </div>          
        </div>  

        <hr className="Horizontal-Line"></hr>

      </div>

      <div className="Project-Tittles-Container">
        {
          projects.map((x) =>(
            <ul>
              <li>
                <Link className="Link-Style" to={{pathname:"/Each_Project_Division", state: {content_to_EPD_from_AP: x.tastks, projectname: x.projectname}}}>
                <div className="Each-Project-Tittle">
                  {x.projectname}
                  <AL_Progress_bar start={x.startdate} end={x.enddate} className="Progress_bar"/>
                </div>
                </Link>
              </li>
            </ul>
          ))
        } 
        
      </div>     

    </div>
  );
}

export default All_Projects;
