
import './styles/Common.css';
import './styles/Each_Project_Division.css';
import Table_Content from '../components/Table_Content/EPD_Table_Content';
import { saveProject } from "../otherFunctions/api"
import { placeInLocalBackUp } from "../otherFunctions/saveFunctions"
import React, { useEffect, useState, useContext } from 'react';
import { MdAssignment, MdSettings, MdAdd, MdDone, MdViewArray, MdViewDay ,MdWatchLater, MdArrowBackIos } from "react-icons/md"

import { Link } from 'react-router-dom';
import Task_Pop_up from '../components/Pop_up/Subtask_Pop_up';

class Each_Project_Division extends React.Component {

  constructor(props) {
    super(props);
    this.state = {test: [],
                  data1FromPopUP: [],
                  data2FromPopUP: [],
                  progressMsgs: '',
                  gantView: false,
                  timeView: false,
                  saveButtonVisible: 'none',
                  seen: false
     };
  }
 
  componentWillMount(){   
    this.setState({test: this.props.history.location.state.content_to_EPD_from_AP})
    if(this.props.history.location.state.firstTime) {
      this.setState({saveButtonVisible: 'block'})
      this.setState({timeView: true})
    }
    //onsole.log('This is test upload inside EPD: '+JSON.stringify(this.props.history.location.state.content_to_EPD_from_AP))
  }

   togglePop = () => {
     console.log(this.state.seen)
     this.setState({ seen: !this.state.seen });
   };
   settingGantView = () => {
    this.setState({ gantView: !this.state.gantView})
  };
  settingTimeView = () => {
    this.setState({ timeView: !this.state.timeView})
    console.log('this.state.timeView: '+this.state.timeView)
  };
    
   settingStates = (List, otherList)=> {
    this.setState({ data1FromPopUP: List }) 
    this.setState({ data2FromPopUP: otherList })
   }

   popupSubmission = (List, otherList) => {
    //console.log(List)
    //console.log(otherList)
    this.settingStates(List, otherList)
    this.setState({ seen: !this.state.seen });
     
    //console.log('data1 From PopUp: '+ JSON.stringify(this.state.data1FromPopUP))
    //console.log('data2 From PopUp: '+ JSON.stringify(this.state.data2FromPopUP))
   /*console.log(seen) */
  };

  hogoromo= ()=> {
    alert('it super worked')
    if(document.getElementsByClassName("checkbutton").checked === true){
      document.getElementsByClassName("switch").style.display = "block";
    } else {
      document.getElementsByClassName("switch").style.display = "none";
    }
  }
  handleInputOthersChangeTimeVersion=(taskIndex, subtaskIndex, time, index, operationType)=>{
    //console.log('It entered this function it just didnt alert')
    const hold= Object.entries(taskIndex)
    //alert('it worked: '+hold[0][1]+" "+subtaskIndex+' '+time,)
    const tIndex = hold[0][1]

   // setProgressMsgs('Progress Saved')
/* 
    console.log('it entered inside Main Changes')
    const { name, value } = e.target;
  
  
    console.log('This is the List name: '+name)*/
    const list = [...this.state.test];
    list[tIndex][0].subtastks[subtaskIndex].times[index] = time;
  
    this.setState({ test: list});   
    //console.log('The test: '+JSON.stringify(this.state.test))
  };

  
  saveEntireProject = async()=> {
    let containNullToggle = false

    this.state.test.forEach((w,iw)=>{
      w.forEach((x,ix)=>{ 
        x.subtastks.forEach((y,iy)=>{ 
          y.times.forEach((z,iz)=>{ 
            if(z ==( '' || '-')){
              this.setState({ progressMsgs: 'Some of The Subtask Time are Empty'})
              containNullToggle = true
              setTimeout(() => this.setState({ progressMsgs: ''}), 1000)
            }
          }) 
        })     
      });
    })

    this.setState({ progressMsgs: 'Saving Project...'})
    let resultFromServer
    
    if(containNullToggle == false) {
      try{
        resultFromServer = await saveProject(this.props.history.location.state.entireProject)
        //console.log('resultFromServer: '+JSON.stringify(resultFromServer) )
      }catch(error){
        console.log(error)
      }

      if(await resultFromServer == 'project saved'){
        this.setState({ progressMsgs: 'Project Saved'})
      }
      else{
        placeInLocalBackUp(this.state.test, 'unsavedOnlineProject') //backs it up before user sets all the times
        this.setState({ progressMsgs: 'Saved in Backup'})
        setTimeout(() => this.setState({ progressMsgs: ''}), 1000)
        
      }
      
      this.setState({saveButtonVisible: 'none'})
      this.setState({timeView: false})
    }

  } 
  
 /* // handle click event of the Remove button
const handleRemoveTaskTimeClick = index => {
  const list = [...inputOthers];
  list[index].times[index].splice(index, 1);
  setInputOthersList(list);
};

// handle click event of the Add button
const handleAddTaskTimeClick = () => {
  console.log('value of index: ' +index)
  const placeholder = [...inputOthers]
  const placeholder2 = placeholder[index].subtask[index2]
  placeholder[index].task = [...placeholder2,{ name: "",startDate: "",endDate: ""}]
  setInputOthersList(placeholder);
};


const handleRemoveSubtaskTimeClick = index => {
  const list = [...inputOthers];
  list.splice(index, 1);
  setInputOthersList(list);
};

// handle click event of the Add button
const handleAddSubtaskTimeClick = (index) => {
  console.log('value of index: ' +index)
  const placeholder = [...inputOthers]
  const placeholder2 = placeholder[index].subtask
  placeholder[index].subtask = [...placeholder2,{ name: "",startDate: "",endDate: ""}]
  setInputOthersList(placeholder);
};  */
  render(){
    return (
      <div className="Entire-Body">
        
        {/*the code for the popup apperance next*/}
        {this.state.seen ? <Task_Pop_up toggle={this.togglePop} handleSubmit={this.popupSubmission}/> : null}

        <div className="Heading-Container">
          <div>
            <Link  className="Link-Style" to="/">
              <header className="h1">
              <MdArrowBackIos  className="colored-icons"/> 
              Projects
              </header>
            </Link>          
          </div> 

          <div>
            <label className="Inline Float-Right switch">
              <input className="checkbutton" type="checkbox" onChange={()=>this.hogoromo()}/>
                <span className="slider round">
                  </span>
            </label>
          </div>


          <div className="Subtittles-Container">
              
          <div className="Inline Float-Right">  
          
              <MdWatchLater onClick={this.settingTimeView} className="colored-icons"/> 

              {this.state.gantView ? (<MdViewArray onClick={this.settingGantView} className="colored-icons"/>):(<MdViewDay onClick={this.settingGantView} className="colored-icons"/>)}
              
              <Link to="/Settings">
                <button className="Inline Button Button-Normal">
                  <MdSettings  className="icons"/> 
                  Settings
                </button>
              </Link>           
            </div> 
            
          
            <div className="Project-Tittle-Add-Task-Container">
              <header className="h2">
                {this.props.history.location.state.projectname}
              </header>           

              <div className="Inline">
                <button className="Button-Save" style={{display: this.state.saveButtonVisible}} onClick={this.saveEntireProject}>
                <MdDone  className="small-icons"/> 
                  Save
                </button> 
              </div>
              <div className="Inline Float-Right">
                <icon/>
                <button className="Button Button-Blue" onClick={this.togglePop}>
                <MdAdd  className="icons"/> 
                  Task
                </button>            
              </div>
            
            </div>        
    
            
              
          </div>
  

          <hr className="Horizontal-Line"></hr>

          <div className="ProgressMsgsDiv" style={{display: this.state.progressMsgs == '' ? 'none': 'block'}}>
            <span className="ProgressMsgs">{this.state.progressMsgs}</span>
          </div>

        </div>

        <div>{console.log('this is props inside EPD: ' +JSON.stringify(this.props.history.location.state.content_to_EPD))}
          <Table_Content 
            content_to_EPD_tableContent_from_EPD={this.state.test} 
            projectname={this.props.history.location.state.projectname}
            gantView={this.state.gantView}
            timeView={this.state.timeView}
            timeChange={this.handleInputOthersChangeTimeVersion}
          />
        </div>

    </div>
    );
  }
}
export default Each_Project_Division;
