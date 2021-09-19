import './styles/All_Projects.css';
import './styles/Common.css';
import { getProjects } from '../otherFunctions/api'
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AL_Progress_bar from '../components/Progress_bar/AL_Progress_bar'
import Project_Pop_up from '../components/Pop_up/Project_Pop_up';

function All_Projects() {

  const [ test, setTest ] = useState([])
  const [ data1FromPopUP, setData1FromPopUp ] = useState([])
  const [ data2FromPopUP, setData2FromPopUp ] = useState([])

  useEffect( async () => {

    getProjects().then( data => {
       console.log(data)       
       localStorage.setItem('my-test', JSON.stringify(data));
       console.log(data.projects) 
       var data2 = data.projects
       var data3 = [...data2]
       setTest(test => [].concat(...data2))
     })
     .catch(err => {console.log(err);}); 
      
      
      /* //var data = localStorage.getItem('my-test')
      var data2 = JSON.parse(data)
      var data3 = data2.projects
      //setTest(JSON.parse(data))
      //console.log(JSON.parse(data));
      var data4 = data3[0].tastks[0];

      setTest(data.projects) */
      //console.log(test);
      //console.log(data4)
  }, []) 
 
  
  const [ seen, setSeen ] = useState(false)

   const togglePop = () => {
     console.log(seen)
    setSeen(!seen)
   };
    
   function settingStates(List, otherList){
    setData1FromPopUp(List)
    setData2FromPopUp(otherList)
   }

   const popupSubmission = (List, otherList) => {
    console.log(List)
    console.log(otherList)
    settingStates(List, otherList)
    setSeen(!seen);
     
    console.log('data1 From PopUp: '+ JSON.stringify(data1FromPopUP))
    console.log('data2 From PopUp: '+ JSON.stringify(data2FromPopUP))
   /*console.log(seen) */
  };
  return (

    
    
    <div className="Entire-Body">
        
        {/*the code for the popup apperance next*/}
        {seen ? <Project_Pop_up toggle={togglePop} handleSubmit={popupSubmission}/> : null}

      <div className="Heading-Container">
          <header className="h1">
            Projects
          </header>

        <div className="Float-Right">
          <button value ="New Projects" className="Button Button-Blue" onClick={togglePop}>
            New Projects
          </button>          
          <div className="Float-Right">
            <Link to="/Settings">
              <icon/>  
              <button className="Button Button-Normal">
                Settings
              </button> 
            </Link>           
          </div>          
        </div>  

        <hr className="Horizontal-Line"></hr>

      </div>

      <div className="Project-Tittles-Container">
        {
          test.map((x) =>(
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
