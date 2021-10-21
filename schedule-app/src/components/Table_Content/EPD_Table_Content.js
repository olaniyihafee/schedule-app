
import '../styles/Table_Content.css';
import '../../screens/styles/Common.css';
import { getProjects } from '../../otherFunctions/api'
import { generateWeeks } from '../../otherFunctions/otherFunctions'

import Task_Progress_bar from '../Progress_bar/Task_Progress_bar'
import Subtask_Progress_bar from '../Progress_bar/Subtask_Progress_bar'

import { Link } from 'react-router-dom';
import { MdArrowDropDown, MdTouchApp } from "react-icons/md"

import React from 'react'
              
 let all_dates = [] ;
 let entire_Projects = [] ; 
  let expansion = [];
  let minimumdate;
  let maximumdate;  
  let dateArray = [];
  let dateArrayOriginal = [];

class Table_Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {test: [],
                  expansion: []
     };

    Date.prototype.addDays = function addDays(days) {
      var dat = new Date(this.valueOf());
      dat.setDate(dat.getDate() + days);
      return dat;
    }
  };

  componentDidMount() {
    //console.log('this is props inside EPD table content: ' +JSON.stringify(this.props) )

    const placeholder = this.props.content_to_EPD_tableContent_from_EPD

    this.setState({
      test: this.props.content_to_EPD_tableContent_from_EPD
     });

    entire_Projects = placeholder

    entire_Projects.forEach((w,i)=>{
      w.forEach((x,i)=>{

      if(x.startdate || x.enddate){

        all_dates.push(x.startdate)
        all_dates.push(x.enddate)
        //console.log('placeholder: '+all_dates) 

        if(x.startdate) {
          this.setState({
            test: placeholder,
            expansion: []
           });

          expansion.push('none')
          let placeholder3 = expansion
          placeholder3.push('none')
          this.setState({ expansion: placeholder3 });
        } 
         x.subtastks.forEach((y,i)=>{
           
           if(y.startdate || y.enddate){

            all_dates.push(y.startdate)
            all_dates.push(y.enddate)
             
           }
         }) 
      }
    });
  })

  //console.log('this.state.all_dates: '+all_dates) 
  this.min_date(all_dates)
  this.max_date(all_dates) 
  this.getDates(minimumdate, maximumdate)
 } ;

 min_date=(all_dates)=> {
    let min_dt = all_dates[0],
     min_dtObj = new Date(all_dates[0]);
     
    //console.log('on instant minimum date: '+all_dates[0])
    all_dates.forEach(function(dt, index)
     {
      while ( new Date( dt ) < min_dtObj)
      {
        min_dt = dt;
        min_dtObj = new Date(dt);
      }
     });
  
    minimumdate= min_dt
  }

  max_date=(all_dates)=>{
    let max_dt = all_dates[0],
     max_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function(dt, index)
     {
      while ( new Date( dt ) > max_dtObj)
      {
        max_dt = dt;
        max_dtObj = new Date(dt);
      }
     });
  
     
    maximumdate= max_dt
  }

  getDates=(minimumdate, maximumdate)=>{    
    let currentDate =  new Date (minimumdate);
    let stopDate =  new Date (maximumdate);
    while (currentDate <= stopDate) {
          dateArray.push( new Date (currentDate).toDateString()) ;
        
        currentDate = currentDate.addDays(7); 
    }
      dateArrayOriginal= dateArray
    //console.log("This is the date Array: " + dateArray)
    //console.log("This is the date Array orig: " + dateArrayOriginal)
    
    //return dateArray;  
  }

  
 increment_date_array=(startdate, enddate)=>{
  all_dates.push(startdate)
  all_dates.push(enddate)

  this.min_date(all_dates)
  this.max_date(all_dates)
}

setAllToFalse =(targetIndex)=>{
  const placeholder = this.state.expansion
  placeholder.forEach((x, index)=>{
     if(index !== targetIndex){placeholder[index] = 'none'}
  })

  this.setState({ expansion: placeholder });
  expansion = placeholder

  console.log('dx in setAllFalse:' +this.state.expansion)
}

handleExpansion = (index) =>{   
  const jumong = Object.entries(index)
  console.log('index in handleexpansion:' +jumong[0])
  const placeholder = this.state.expansion
  if(placeholder[index] === 'none'){placeholder[index] = 'flex'}
  //else placeholder[index] = 'none'

  this.setState({ expansion: placeholder });
  expansion = placeholder

  //console.log('dx in toggleContent:' +expansion)

  this.setAllToFalse(index)
}

 render() { 

  return (
    <div className="Table-Entire-Container">

      
      <div className="Table-Left-Container">
        
          <div className="Tasks-Headings-Container">
            <ul className="Tasks-Headings-ul" >
              <li className="Main-T">Task name</li>
              <li className="Main-S-D">Start</li>
              <li className="Main-S-D">Due</li>
              <li className="Main-D-D">Days</li>
              <li className="Main-D-D">%</li>
            </ul>
            <hr className="Horizontal-Line"></hr>
          </div>                
                          <div>
                           {                            
                            this.state.test.map((fromTest,outerIndex) => (
                              fromTest.map((jumong,taskIndex) => (
                            <div key={jumong.taskname}>
                                     
                                        <div className="Tasks-Headings-Container">                                        
                                          <ul className="Tasks-Headings-ul" >
                                          
                                            <li className="Tasks">
                                              <Link to={{pathname:"/Each_Divisions_Division", state: {content_to_EDD_from_EPD_tableContent: jumong.subtastks, taskname: jumong.taskname, projectname: this.props.projectname} }}>
                                                <MdArrowDropDown className="icons"/>
                                              </Link>
                                              <MdTouchApp className="icons" onClick={({outerIndex})=> this.handleExpansion({outerIndex})}/>
                                            {jumong.taskname}{/* {outerIndex} */}</li>
                                            <li className="Start" onClick={({outerIndex})=> this.handleExpansion({outerIndex})}>{jumong.startdate}</li>
                                            <li className="Due">{jumong.enddate}</li>
                                            <li className="Days">Days</li>
                                            <li className="Percentage">%</li>
                                          </ul>
                                          <hr className="MDW-H-Line"></hr>
                                        </div>
                                      
                                  
                                  <div style={{display: this.state.expansion[{outerIndex}]}}>
                                    <div className="Tasks-Headings-Container">
                                    {
                                    jumong.subtastks.map((boy) => (
                                      <div>
                                        <ul  className="Tasks-Headings-ul" key={boy.subtaskname}>
                                          <li className="Tasks-Subtopic">{boy.subtaskname}</li>
                                          <li className="Start-Subtopic">{boy.startdate}</li>
                                          <li className="Due-Subtopic">{boy.enddate}</li>
                                          <li className="Days-Subtopic">Days</li>
                                          <li className="Percentage-Subtopic">%</li>
                                        </ul>
                                        <hr className="LWW-H-Line"></hr>
                                      </div>
                                      ))  
                                    }
                                    </div>
                                  </div>
                            </div>

                            ))
                            ))
                          }                          
                          </div>
                      

      </div>  

      <div className="Table-Right-Container">
        <div className="All-Dates">
        {this.props.gantView == false ?(                  
          dateArrayOriginal.map((jumong) => (
            <div className="Inline Each-Date">
                <li  className="Inline">{jumong}</li> 
                {generateWeeks(dateArrayOriginal[0])}
            </div>
          ))): (
            <div className="All-Dates" style={{width: '800px'}}>
              <li  className="Inline Each-Date">{dateArrayOriginal[0]}</li> 
              <li  className="Inline Each-Date" style={{margin: 'auto'}}>{dateArrayOriginal[((dateArrayOriginal.length)/2)]}</li> 
              <li  className="Inline Each-Date" style={{float: 'right'}}>{dateArrayOriginal[dateArrayOriginal.length-1]}</li> 
              <hr className="LWW-H-Line"></hr>
            </div>            
          )} 

        </div>
       

              <div className="All_T_R_Row">
              {                            
                this.state.test.map((fromTest,outerIndex) => (
                  fromTest.map((jumong,taskIndex) => (
                <div key={jumong.taskname}>
                        <div>                          
                          { this.increment_date_array(jumong.startdate, jumong.enddate) }                          
                          <Task_Progress_bar minimumdate={minimumdate} 
                            start={jumong.startdate} end={jumong.enddate} 
                            timeChange={this.props.timeChange}                            
                            entireTimes={this.state.test}
                            times={jumong.times}
                            gantView={this.props.gantView}
                            timeView={this.props.timeView}
                          />                          
                          <hr className="LWW-H-Line"></hr>

                        </div>
                      <div style={{display: this.state.expansion[{outerIndex}]}}>
                      <div className="">
                     {
                        jumong.subtastks.map((boy,subtaskIndex) => (

                          <div>                            
                             {this.increment_date_array(boy.startdate, boy.enddate)} 
                            <Subtask_Progress_bar minimumdate={minimumdate} 
                              start={boy.startdate} end={boy.enddate} 
                              timeChange={this.props.timeChange}
                              entireTimes={this.state.test}
                              times={boy.times}
                              gantView={this.props.gantView}
                              timeView={this.props.timeView}
                              taskIndex={{outerIndex}}
                              subtaskIndex={subtaskIndex}
                            />
                            <hr className="LWW-H-Line"></hr>
                          </div>  
                        
                        ))
                      }
                      </div>
                      </div>
                </div>
                ))
                ))
              } 
      </div> 

  </div>
  </div>
  );
}
}

export default Table_Content;
