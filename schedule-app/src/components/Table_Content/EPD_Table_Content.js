
import '../styles/Table_Content.css';
import '../../screens/styles/Common.css';
import { getProjects } from '../../otherFunctions/api'
import { generateWeeks } from '../../otherFunctions/otherFunctions'

import Task_Progress_bar from '../Progress_bar/Task_Progress_bar'
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

    /* await getProjects().then( data => {
       console.log(data)       
       localStorage.setItem('my-test', JSON.stringify(data));
       console.log(data.projects[0].tastks)
       var data2 = data.projects[0].tastks
       var data3 = [...data2]
       setTest(test => [].concat(...data2)) */
       console.log('this is props inside table content: ' +JSON.stringify(props) )
       setTest(test => [].concat(...props.content_to_EPD_tableContent_from_EPD))
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

       
     /* })
     .catch(err => {console.log(err);});  */
      
     //findFarthestAndNearestTime()

     //console.log(min_date(['01/27/2015', '02/02/2015', '03/01/2015']));
     //console.log(max_date(['01/27/2015', '02/02/2015', '03/01/2015']));

      /* var data = localStorage.getItem('my-test')
      var data2 = JSON.parse(data)
      var data3 = data2.projects
      //setTest(JSON.parse(data))
      //console.log(JSON.parse(data));
      var data4 = data3[0].tastks[0];

      setTest(data.projects[0]) */
      //console.log(test);
      //console.log(data4)
  }, [dateArrayOriginal]) 


  const  handleExpansion = () =>{
    
    /* if (trial[0]  === false )
    {setExpanded(true)} */
    console.log(expanded[0])
    console.log(expanded[1])

    if ((expanded[0] || expanded[1]) == false )
    {
      alert('it entered this function')
      /* console.log(expanded[0])
      console.log(expanded[1]) */
      setExpanded([true ,true])
      /* console.log(expanded[0])
      console.log(expanded[1]) */
    }

    else if ((expanded[0] || expanded[1]) == true ){
      alert('then it entered this function')
      setExpanded([false, false])
    }
    
  }


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
                            <Accordion>
                              <AccordionItem 
                                dangerouslySetExpanded={expanded[0]} 
                                onClick={()=>handleExpansion()}  
                                key={jumong.taskname}>
                                  <AccordionItemHeading>
                                      <AccordionItemButton>
                                        <div className="Tasks-Headings-Container">                                        
                                          <ul className="Tasks-Headings-ul" >
                                          
                                            <li className="Tasks">
                                              <Link to={{pathname:"/Each_Divisions_Division", state: {content_to_EDD_from_EPD_tableContent: jumong.subtastks, taskname: jumong.taskname, projectname: } }}>
                                                <icon>div </icon>
                                              </Link>
                                            {jumong.taskname}</li>
                                            <li className="Start">{jumong.startdate}</li>
                                            <li className="Due">{jumong.enddate}</li>
                                            <li className="Days">Days</li>
                                            <li className="Percentage">%</li>
                                          </ul>
                                          <hr className="MDW-H-Line"></hr>
                                        </div>
                                      </AccordionItemButton>
                                  </AccordionItemHeading>
                                  <AccordionItemPanel>
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
                                  </AccordionItemPanel>
                              </AccordionItem>
                            </Accordion>

                            ))
                          }  

                        {/*     <Accordion>
                              <AccordionItem 
                                uuid={1} 
                                dangerouslySetExpanded={expanded[0]} 
                                onClick={()=>handleExpansion()}>
                                  <AccordionItemHeading>
                                      <AccordionItemButton>
                                          What harsh truths do you prefer to ignore?
                                      </AccordionItemButton>
                                  </AccordionItemHeading>
                                  <AccordionItemPanel>
                                      <p>
                                          Exercitation in fugiat est ut ad ea cupidatat ut in
                                          cupidatat occaecat ut occaecat consequat est minim minim
                                          esse tempor laborum consequat esse adipisicing eu
                                          reprehenderit enim.
                                      </p>
                                  </AccordionItemPanel>
                              </AccordionItem>
                              <AccordionItem>
                                  <AccordionItemHeading>
                                      <AccordionItemButton>
                                          Is free will real or just an illusion?
                                      </AccordionItemButton>
                                  </AccordionItemHeading>
                                  <AccordionItemPanel>
                                      <p>
                                          In ad velit in ex nostrud dolore cupidatat consectetur
                                          ea in ut nostrud velit in irure cillum tempor laboris
                                          sed adipisicing eu esse duis nulla non.
                                      </p>
                                  </AccordionItemPanel>
                              </AccordionItem>

                              <AccordionItem
                                uuid={1} 
                                dangerouslySetExpanded={expanded[1]} 
                                onClick={()=>handleExpansion()}>
                                  <AccordionItemHeading>
                                      <AccordionItemButton>
                                          We all prefer to ignore the harshest truths of all
                                      </AccordionItemButton>
                                  </AccordionItemHeading>
                                  <AccordionItemPanel>
                                      <p>
                                          Exercitation in fugiat est ut ad ea cupidatat ut in
                                          cupidatat occaecat ut occaecat consequat est minim minim
                                          esse tempor laborum consequat esse adipisicing eu
                                          reprehenderit enim.
                                      </p>
                                  </AccordionItemPanel>
                              </AccordionItem>
                              <AccordionItem></AccordionItem>
                          </Accordion> */}
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
       

              <div className="All_T_R_Row">
              {                            
                test.map((jumong) => (
                <Accordion>
                  <AccordionItem 
                    dangerouslySetExpanded={expanded[0]} 
                    onClick={()=>handleExpansion()}  
                    key={jumong.taskname}>
                      <AccordionItemHeading>
                        <AccordionItemButton>                          
                          {increment_date_array(jumong.startdate, jumong.enddate)}
                          <Task_Progress_bar minimumdate={minimumdate} start={jumong.startdate} end={jumong.enddate} />
                          <hr className="LWW-H-Line"></hr>

                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                      {
                        jumong.subtastks.map((boy) => (

                          <div className="">                            
                            {increment_date_array(boy.startdate, boy.enddate)}
                            <Subtask_Progress_bar minimumdate={minimumdate} start={boy.startdate} end={boy.enddate} />
                            <hr className="LWW-H-Line"></hr>
                          </div>  
                        
                        ))
                      }
                      </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
                ))
              } 
      </div> 

  </div>
  </div>
  );
}

export default Table_Content;
