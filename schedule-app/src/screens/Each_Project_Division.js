
import './styles/Common.css';
import './styles/Each_Project_Division.css';
import Table_Content from '../components/Table_Content/EPD_Table_Content';
import { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import Subtask_Pop_up from '../components/Pop_up/Subtask_Pop_up';

function Each_Project_Division(props) {

  const [ test, setTest ] = useState([])
  const [ data1FromPopUP, setData1FromPopUp ] = useState([])
  const [ data2FromPopUP, setData2FromPopUp ] = useState([])
   
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
      {seen ? <Subtask_Pop_up toggle={togglePop} handleSubmit={popupSubmission}/> : null}

      <div className="Heading-Container">
        <div>
          <Link  className="Link-Style" to="/">
            <icon/>
            <header className="h1">
              Projects
            </header>
          </Link>          
        </div> 

        <div className="Subtittles-Container">
        <div className="Inline Small-Container Float-Right">
            <Link to="/Settings">
              <icon/>  
              <button className="Button Button-Normal">
                Settings
              </button> 
            </Link>                  
          </div> 
        
          <div className="Project-Tittle-Add-Task-Container">
            <header className="h2">
              {props.history.location.state.projectname}
            </header>
            <div className="Inline Float-Right">
              <icon/>
              <button className="Button Button-Blue" onClick={togglePop}>
                Task
              </button>            
            </div>
          </div>        
  
          
            
        </div>
 

        <hr className="Horizontal-Line"></hr>

      </div>

      <div>{console.log('this is props inside EPD: ' +JSON.stringify(props.history.location.state.content_to_EPD))}<Table_Content content_to_EPD_tableContent_from_EPD={props.history.location.state.content_to_EPD_from_AP}/></div>

  </div>
  );
}

export default Each_Project_Division;
