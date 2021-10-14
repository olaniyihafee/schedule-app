import './styles/Add_Project_Pop_up.css';
import React, { Component, useState, useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';


export default function Project_Pop_up (prop) {

  const [inputOthers, setInputOthersList] = useState([{ taskName: "",startDate: "",endDate: "",sun: "",mon: "",tue: "",wed: "",thu: "",fri: "",sat: "",subtask: [{ name: "jumong",startDate: "jumong",endDate: ""}] }]);
  const [inputMain, setInputMainList] = useState([{projectName: "",startDate: "",endDate: "",sun: "",mon: "",tue: "",wed: "",thu: "",fri: "",sat: ""}]);

  const [projectError, setProjectError] = useState('')
  const [taskError, setTaskError] = useState('')
  const [subTaskError, setSubtaskError] = useState('eujtykdc h')

    // handle input change
const handleInputOthersChange = (e, index) => {

  console.log('it entered inside Main Changes')
  const { name, value } = e.target;


  console.log('This is the List name: '+name)
  const list = [...inputOthers];
  list[index][name] = value;

  setInputOthersList(list);   
  
  outOfProjectSpan(index, e, inputMain, inputOthers, setInputOthersList, setProjectError)
  checkForIncompletePrerequisiteInTask(e, index, inputOthers, setInputOthersList, setTaskError)
};

// handle input change
const isContainedInputOthers = ( name, index ) => {
  let isThere = false
  if ( inputOthers[index][name] == "" ){ isThere = false }
  else isThere = true

  return isThere
};

// handle input change
const handleInputOthersOfCheckBoxes = (e, index) => {

console.log('it entered inside checkboxes')

const { name, value } = e.target;
const list = [...inputOthers];

if ( isContainedInputOthers( name, index ) ){list[index][name] = '';}
else list[index][name] = name;

//list[name] = value;
//list.tasks = inputList;
setInputOthersList(list);
checkForIncompletePrerequisiteInTask(e, index, inputOthers, setInputOthersList, setTaskError)
};

// handle input change
const handleInputPopUpChange = (e, index, index2) => {

console.log('it entered inside Main Changes')
  const { name, value } = e.target;


  console.log('This is the List name: '+name)
  const list = [...inputOthers];
  list[index].subtask[index2][name] = value;

  setInputOthersList(list);
  
  emptySubTaskNameOrDate(index, index2, e, inputOthers, setInputOthersList, setTaskError)

};

// handle click event of the Remove button
const handleRemoveClick = index => {
  const list = [...inputOthers];
  list.splice(index, 1);
  setInputOthersList(list);
};

// handle click event of the Add button
const handleAddClick = () => {
  setInputOthersList([...inputOthers, { taskName: "",startDate: "",endDate: "",sun: "",mon: "",tue: "",wed: "",thu: "",fri: "",sat: "",subtask: [{ name: "jumong",startDate: "jumong",endDate: ""}] }]);
};


const handleRemoveSubtaskClick = index => {
  const list = [...inputOthers];
  list.splice(index, 1);
  setInputOthersList(list);
};

// handle click event of the Add button
const handleAddSubtaskClick = (index) => {
  console.log('value of index: ' +index)
  const placeholder = [...inputOthers]
  const placeholder2 = placeholder[index].subtask
  placeholder[index].subtask = [...placeholder2,{ name: "",startDate: "",endDate: ""}]
  setInputOthersList(placeholder);
};

const handleSave = () => {
  //prop.handleSubmit(inputMain, inputOthers)
  //prop.toggle
}

var visibleId = null;

function showSubtask(index) {
  if(visibleId !== index) {
    visibleId = index;

    console.log('visibleId: ' +visibleId)
  } 
  hideSubtask();
}
function hideSubtask() {
  var div, i;
  for(i = 0; i < inputOthers.length; i++) {
    //console.log('String value of i: ' +`${i}`)
    div = document.getElementById(`${i}`);
    //console.log('div representation: ' +div)
    if(visibleId === `${i}`) {
      //console.log('its in the show if statement: ' +visibleId)
      div.style.display = "block";
    } else {
      //console.log('its in the show else statement: ' +visibleId)
      div.style.display = "none";
    }
  }
}
  return (
   <div className="modal">
     <div className="modal_content">

    <span className="close" onClick={prop.toggle}>&times; </span>
      <p className='error'>{projectError}</p>
      <p className='error'>{taskError}</p>
       
      {inputOthers.map((x, i) => {
          return (

            <div className="each_list_bounding_box">
                  <input
                    className="input_text"
                    name="taskName"
                    placeholder="Enter Task Name"
                    value={x.taskName}
                    onChange={e => handleInputOthersChange(e,i)}
                  />
                  <input
                    type="date"
                    className="input_date"
                    name="startDate"
                    placeholder="Start Date"
                    value={x.startDate}
                    onChange={e => handleInputOthersChange(e,i)}
                    onClick={e => {
                      setProjectError('')
                      setTaskError('')
                    }}
                />
                <input
                    type="date"
                    className="input_date"
                    name="endDate"
                    placeholder="End Date"
                    value={x.endDate}
                    onChange={e => handleInputOthersChange(e,i)}
                    onClick={e => {
                      setProjectError('')
                      setTaskError('')
                    }}
                />

              
                  <Accordion>
                        <AccordionItem>                         
                            <AccordionItemPanel>
                                <div>
                                    <input
                                        className="input_text_short"
                                        name="days"
                                        placeholder="Days"
                                        value=""
                                        /* onChange={e => handleInputChange(e,i)}  */
                                    />
                            </div>

                            
                            <div>
                                    s
                                    <input
                                        type="checkbox"
                                        className="date_checkboxes"
                                        name="sun"
                                        value={x.sun}
                                        onChange={e => handleInputOthersOfCheckBoxes(e,i)}
                                        onClick={e => {
                                          setProjectError('')
                                          setTaskError('')
                                        }}
                                    />
                                    m
                                    <input
                                        type="checkbox"
                                        className="date_checkboxes"
                                        name="mon"
                                        value={x.mon}
                                        onChange={e => handleInputOthersOfCheckBoxes(e,i)}
                                        onClick={e => {
                                          setProjectError('')
                                          setTaskError('')
                                        }}
                                    />
                                    t
                                    <input
                                        type="checkbox"
                                        className="date_checkboxes"
                                        name="tue"
                                        value={x.tue}
                                        onChange={e => handleInputOthersOfCheckBoxes(e,i)}
                                        onClick={e => {
                                          setProjectError('')
                                          setTaskError('')
                                        }}
                                    />
                                    w
                                    <input
                                        type="checkbox"
                                        className="date_checkboxes"
                                        name="wed"
                                        value={x.wed}
                                        onChange={e => handleInputOthersOfCheckBoxes(e,i)}
                                        onClick={e => {
                                          setProjectError('')
                                          setTaskError('')
                                        }}
                                    />
                                    th
                                    <input
                                        type="checkbox"
                                        className="date_checkboxes"
                                        name="thu"
                                        value={x.thu}
                                        onChange={e => handleInputOthersOfCheckBoxes(e,i)}
                                        onClick={e => {
                                          setProjectError('')
                                          setTaskError('')
                                        }}
                                    />
                                    f
                                    <input
                                        type="checkbox"
                                        className="date_checkboxes"
                                        name="fri"
                                        value={x.fri}
                                        onChange={e => handleInputOthersOfCheckBoxes(e,i)}
                                        onClick={e => {
                                          setProjectError('')
                                          setTaskError('')
                                        }}
                                    />
                                    s
                                    <input
                                        type="checkbox"
                                        className="date_checkboxes"
                                        name="sat"
                                        value={x.sat}
                                        onChange={e => handleInputOthersOfCheckBoxes(e,i)}
                                        onClick={e => {
                                          setProjectError('')
                                          setTaskError('')
                                        }}
                                    />
                            </div>
                                            
                            </AccordionItemPanel>

                            <AccordionItemButton className="float_right">
                                <button className="more_button">more</button>
                            </AccordionItemButton>

                        </AccordionItem>
                    </Accordion>

                    <button onClick={e => showSubtask(`${i}`)}>Subtasks</button>
                    <div id={`${i}`} className="popup_test popup_1">{x.taskName}   
                    

                    {x.subtask.map((y, j) => {
                      return (

                        <div className="each_list_bounding_box">
                    
                        <p className='error'>{subTaskError}</p>
                              <input
                                className="input_text"
                                name="name"
                                placeholder="Enter Task Name"
                                value={y.taskName}
                                onChange={e => handleInputPopUpChange(e,i,j)}
                              />
                              <input
                                type="date"
                                className="input_date"
                                name="startDate"
                                placeholder="Start Date"
                                value={y.startDate}
                                onChange={e => handleInputPopUpChange(e,i,j)}
                              />
                              <input
                                type="date"
                                className="input_date"
                                name="endDate"
                                placeholder="End Date"
                                value={y.endDate}
                                onChange={e => handleInputPopUpChange(e,i,j)}
                              />


                                <div className="each_list_buttons">
                                {x.subtask.length !== 1 && <button
                                  className="remove_button"
                                  onClick={() => handleRemoveSubtaskClick(j)}>Remove</button>}
                                {x.subtask.length - 1 === j && <button 
                                    className="add_button"
                                    onClick={() => handleAddSubtaskClick(i)} >Add</button>}
                              </div>

                            </div>
                        );
                    })}   
                    </div>

                    
                    <div className="each_list_buttons">
                    {inputOthers.length !== 1 && <button
                      className="remove_button"
                      onClick={() => handleRemoveClick(i)}>Remove</button>}
                    {inputOthers.length - 1 === i && <button 
                        className="add_button"
                        onClick={handleAddClick} >Add</button>}
                  </div>
                    
                </div>
            );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputOthers)}</div> */}

      </div> {/* end of modal content */}

   </div>
  );
 
} 



 
   {/* <div className="App">
     <h3><a href="https://cluemediator.com">Clue Mediator</a></h3>
     {inputList.map((x, i) => {
       return (
         <div className="box">
           <input
             name="firstName"
  placeholder="Enter First Name"
             value={x.firstName}
             onChange={e => handleInputChange(e, i)}
           />
           <input
             className="ml10"
             name="lastName"
  placeholder="Enter Last Name"
             value={x.lastName}
             onChange={e => handleInputChange(e, i)}
           />
           <div className="btn-box">
             {inputList.length !== 1 && <button
               className="mr10"
               onClick={() => handleRemoveClick(i)}>Remove</button>}
             {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
           </div>
         </div>
       );
     })}
     <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
   </div> */}

