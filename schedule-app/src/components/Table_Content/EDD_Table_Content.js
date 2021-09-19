
import '../styles/Table_Content.css';
import '../../screens/styles/Common.css';
import { getProjects } from '../../otherFunctions/api'
import { generateWeeks } from '../../otherFunctions/otherFunctions'

import Subtask_Progress_bar from '../Progress_bar/Subtask_Progress_bar'

import { Link } from 'react-router-dom';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import { useEffect, useState } from 'react'

function Table_Content(props) {

  const [ expanded, setExpanded ] = useState([false, false])
  const [ minDate, setminDate ] = useState() //instead of using this value it used minimumdate variable instead, it used it in the minimumdate variable in progressbar
  const [ maxDate, setmaxDate ] = useState()
  const [ dateArrayOriginal, setdateArrayOriginal ] = useState([])
  const [ test, setTest ] = useState([])

  var all_dates = []  
  var minimumdate;
  var maximumdate;  
  var dateArray = new Array();

  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, endDate) {

    var currentDate =  new Date (startDate);
    var stopDate =  new Date (endDate);
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate).toDateString());
        
        currentDate = currentDate.addDays(7); 
    }

    console.log("This is the date Array: " + dateArray)
    setdateArrayOriginal( dateArray)
    //return dateArray;  
}

function min_date(all_dates) {
  var min_dt = all_dates[0],
   min_dtObj = new Date(all_dates[0]);
   
  //console.log('on instant minimum date: '+min_dt)
  all_dates.forEach(function(dt, index)
   {
    if ( new Date( dt ) < min_dtObj)
    {
      min_dt = dt;
      min_dtObj = new Date(dt);
    }
   });

   //setminDate(min_dt) 
  //console.log('minimum date:' + min_dt)
  minimumdate = min_dt
}

function max_date(all_dates) {
    var max_dt = all_dates[0],
     max_dtObj = new Date(all_dates[0]);
    all_dates.forEach(function(dt, index)
     {
      if ( new Date( dt ) > max_dtObj)
      {
        max_dt = dt;
        max_dtObj = new Date(dt);
      }
     });

     //setmaxDate(max_dt) 
    //console.log('maximum date:' + max_dt)
    maximumdate = max_dt
}

function increment_date_array(startdate, enddate){
  all_dates.push(startdate)
  all_dates.push(enddate)
  //console.log('it entered this function')

  min_date(all_dates)
  max_date(all_dates)
  //getDates(minimumdate, maximumdate)
}

  useEffect( async () => {
    
       console.log('this is props inside table content: ' +JSON.stringify(props.content_to_EDD_tableContent_from_EDD) )
       setTest(test => [].concat(...props.content_to_EDD_tableContent_from_EDD))
       console.log(test) 
       test.forEach((x,i)=>{
         if(x.startdate){
          all_dates.push(x.startdate)
            x.subtastks.forEach((y,i)=>{
              if(y.startdate){
                all_dates.push(y.startdate)

                
              }
            })
         }
       })

       min_date(all_dates)
       max_date(all_dates)
       getDates(minimumdate, maximumdate)
       setminDate(minimumdate) //instead of using this function and its value it used minimumdate variable instead, it used it in the minimumdate variable in progressbar
       
     //console.log(min_date(['01/27/2015', '02/02/2015', '03/01/2015']));
     //console.log(max_date(['01/27/2015', '02/02/2015', '03/01/2015']));
      
  }, []) 

  const taskStartDateArray = []
  const taskEndDateArray = [] 
  

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
              test.map((jumong) => (
              
                <div className="Tasks-Headings-Container">                                        
                  <ul className="Tasks-Headings-ul" >
                  <icon> </icon>
                    <li className="Tasks">{jumong.subtaskname}</li>
                    <li className="Start">{jumong.startdate}</li>
                    <li className="Due">{jumong.enddate}</li>
                    <li className="Days">Days</li>
                    <li className="Percentage">%</li>
                  </ul>
                  <hr className="MDW-H-Line"></hr>
                </div>                        

              ))
            }          
            </div>                      

      </div>  



      <div className="Table-Right-Container">
        
      <div className="All-Dates">
        {                            
          dateArrayOriginal.map((jumong) => (
            <div className="Inline Each-Date">
                <li  className="Inline">{jumong}</li> 
                {generateWeeks(dateArrayOriginal[0])}
            </div>
          ))}

        </div>

              <div className="">
              {                            
                test.map((jumong) => (
                  <div>                     
                    {increment_date_array(jumong.startdate, jumong.enddate)}
                      <Subtask_Progress_bar minimumdate={minimumdate} start={jumong.startdate} end={jumong.enddate} />
                      <hr className="LWW-H-Line"></hr>
                  </div>

                        
                ))
              } 
      </div> 

  </div>
  </div>
  );
}

export default Table_Content;
