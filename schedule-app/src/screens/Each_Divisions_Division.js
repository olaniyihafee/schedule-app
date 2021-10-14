
import './styles/Each_Divisions_Division.css';
import './styles/Common.css';
import Table_Content from '../components/Table_Content/EDD_Table_Content';
import { useEffect, useState, useContext } from 'react';
import {BrowserRouter, Switch, Route, useHistory} from 'react-router-dom';

import { Link } from 'react-router-dom';
import Subtask_Pop_up from '../components/Pop_up/Subtask_Pop_up';

function Each_Division_Division(props, location) {

  const [ test, setTest ] = useState([])
  const [ data1FromPopUP, setData1FromPopUp ] = useState([])
  const [ data2FromPopUP, setData2FromPopUp ] = useState([])

  const [ seen, setSeen ] = useState(false)

  useEffect( async () => {console.log('props:  '+JSON.stringify(props))}, []) 

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

  const history = useHistory()

  return (
    <div className="Entire-Body">    
      
      {/*the code for the popup apperance next*/}
      {seen ? <Subtask_Pop_up toggle={togglePop} handleSubmit={popupSubmission}/> : null}

      <div className="Heading-Container">
        <div onClick={()=>history.goback()}>
        <Link  className="Link-Style" >
          <icon/>
          <header className="h1">
            {props.history.location.state.projectname}
          </header>
        </Link>
        </div> 
        

        <div className="Subtittles-Container">

          <div className="Small-Container Float-Right">
            <Link to="/Settings">
              <icon/>  
              <button className="Button Button-Normal">
                Settings
              </button> 
            </Link>        
          </div>             
        
          <div className="Project-Tittle-Add-Task-Container">
            <header className="h2">
              {props.history.location.state.taskname}
            </header>
            <div className="Float-Right">
              <icon/>
              <button className="Button Button-Blue" onClick={togglePop}>
                Sub-Task
              </button>            
            </div>
          </div>  
          
        </div>
 

        <hr className="Horizontal-Line"></hr>

      </div>

      <div>{console.log('this is props inside EDD: ' +JSON.stringify(props) )}<Table_Content content_to_EDD_tableContent_from_EDD={props.history.location.state.content_to_EDD_from_EPD_tableContent}/></div>
  </div>
  );
}

export default Each_Division_Division;
