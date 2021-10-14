import React, { useEffect, useState } from 'react'


class Subtask_Time_Bar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {times: [],
                  entireTimes: [],
                  errorMsg: ''
     };
  }
 

componentWillMount(){
  this.setState({times: this.props.times});
  //console.log('Times: '+props.times)
  this.setState({entireTimes: this.props.entireTimes});
  //console.log('entireTimes: '+this.state.entireTimes)
  //console.log('entireTimes: '+this.props.entireTimes)
} 

  // handle click event of the Remove button
handleRemoveTimeClick = index => {
  const list = [...this.state.times];
  list.splice(index, 1);
  this.setState({times: list});
};

// handle click event of the Add button
handleAddTimeClick = index => {
  console.log('value of index: ' +index)
  const placeholder = [...this.state.times]
  placeholder.push('-')
  this.setState({times: placeholder});
};

/* 
const dateIsNotIncluded = (index, index2) =>{
    return (
      <div>
        <p>{y.taskname}</p>
        <p>{y.subtaskname}</p>
        <input
          type="time"
          name="tue"
          value={z.startDate}
          style={{ 
            width: '68px',height: '12px', margin: '3px'
          }}
        /> 
        <input
          type="time"
          name="tue"
          value={z.endDate}
          style={{ 
            width: '68px',height: '12px'
          }}
        />  
      </div>
    )
}*/

timeChange = (e ,i, startTime) => {
  //console.log('The e in timeChange: '+value)

  if(startTime == "start"){
    
  const {name, value} = e.target

    const list = [...this.state.times];
    const placeholder = value+'-'
    list[i] = placeholder;
    console.log('The e in starttime: '+value+' ' +i)
    console.log('Times: '+list)
    this.setState({times: list}); 
  } 
  else if(startTime == "end"){
    
  const {name, value} = e.target
    //console.log('its in the else of the if of ifs: ')
    const Placeholder1 = [...this.state.times]
    let placeholder2 = ''
    placeholder2 = Placeholder1[i].split('-')
    let placeholder3 = placeholder2[0]+'-'+value
    const placeholder4 = [...this.state.times]
    placeholder4[i] = placeholder3
    //console.log('Value: '+value)
    this.setState({times: placeholder4}) 
  }  

  else {
    console.log('its in the else statement: ')
    console.log('Times: '+this.state.times)

    if(this.state.times[i] == '-' ){
      //const firstTime = document.getElementsByName('initialTime')
      //firstTime.setAttribute('border') = '2px solid red' 
      console.log('its in the if of ifs: ')
      const tPlaceholder = [...this.state.times]
      tPlaceholder[i] = ''
      this.setState({times: tPlaceholder})
      console.log('Times: '+this.state.times)

      this.setState({errorMsg: 'The start time is Empty'})
    }
    else{
      //console.log('its in the else of the if of ifs: ')
      const Placeholder1 = [...this.state.times]
      let placeholder2 = Placeholder1[i].split('-')
      //console.log('Times: '+this.state.times)
      const startTime = placeholder2[0]
      const endTime = placeholder2[1]
      
      let entireTimeCheckResult = true
      
      this.state.entireTimes.forEach((w,iw)=>{
        w.forEach((x,ix)=>{ 
          x.subtastks.forEach((y,iy)=>{          
            
            const dateInclusion = ((y.startdate <= this.props.startdate) && (y.enddate >= this.props.enddate)) || 
            ((y.startdate >= this.props.startdate) && (y.enddate >= this.props.enddate)) || 
            ((y.startdate <= this.props.startdate) && (y.enddate <= this.props.enddate))

            if(dateInclusion){

                y.times.forEach((z,iz)=>{ 
                  const june = z
                  console.log('june: '+typeof june)
                  let timeString = []
                  try{
                    if(june !== '-') timeString = june.split('-')
                    else timeString = [,]
                  }catch(err){console.log(err);}

                  const timeInclusion = ((timeString[0] <= startTime) && (timeString[1] >= endTime)) ||
                  ((timeString[0] >= startTime) && (timeString[0] >= startTime) && (timeString[1] >= endTime)) ||
                  (((timeString[0] <= startTime) && (timeString[0] !== '')) && ((timeString[1] >= startTime) && (timeString[1] <= endTime) && (timeString[1] !== ''))) ||
                  ((timeString[0] >= startTime) && (timeString[1] <= endTime));
                  
                  if(timeInclusion){
                    //alert('Time Error: '+endTime)
                    
                    this.setState({errorMsg: 'The start time is Empty'})
                    entireTimeCheckResult = false
                  }
                }) 

            }
          })     
      });
      })

      if(entireTimeCheckResult == true) this.props.timeChange(this.props.taskIndex, this.props.subtaskIndex, this.state.times[i], i, 'add')
    } 
  } 
};

  render() { 
    return (
      <div style={{ width: 'inherit',backgroundColor: '#E601DDA1', height: '0px'}} >  
        <div
          style={{ display:'inline',
            position: 'sticky' ,top:'1%',left: '10%',
            zIndex: '4', paddingTop: '9px',width: '270px',height: '0px'
          }}>
        {
          this.state.times.map((x,i) => { 
            const june = x
            const output = june.split('-')
            return (
              <div
                style={{ display:'inline-block',
                margin: '3px',backgroundColor: 'rgba(109, 106, 106, 0.055)'
                }}>
                  
                <input
                  type="time"
                  name="start"
                  value={output[0]}
                  style={{ 
                    width: '92px',height: '10px', margin: '3px'
                  }}
                  onChange={(e)=>this.timeChange(e, i,"start")}
                /> 
                <input
                  type="time"
                  name="end"
                  value={output[1]}
                  style={{ 
                    width: '92px',height: '10px'
                  }}
                  onChange={(e)=>this.timeChange(e,i,"end")}
                  //onSubmit={(e)=>this.timeChange(e,i)}
                />  

              <div style={{display:'inline-block',}}>
                <button 
                    style={{               
                      width: '8px',height: '14px',
                      borderRadius: '6px',border: '2px solid blue',
                      backgroundColor: 'white',
                      margin: '2px'
                    }}r
                    onClick={() => this.timeChange(null,i)}
                    >            
                </button>
                {this.state.times.length !== 1 && 
                  <button 
                  style={{               
                    width: '12px',height: '12px',
                    borderRadius: '5px',border: 'none',
                    backgroundColor: 'red',
                    margin: '2px'
                  }}r
                  onClick={() => this.handleRemoveTimeClick(i)}
                  >            
                </button>}
                {this.state.times.length - 1 === i && 
                  <button 
                  style={{               
                    width: '12px',height: '12px',
                    borderRadius: '5px',border: 'none',
                    backgroundColor: 'green',
                    margin: '2px'
                  }}a                      
                    onClick={this.handleAddTimeClick}>     
                </button>}
              </div>
              <div>{this.state.errorMsg}</div>
          </div> )
        }) } 
        
        </div>
      </div>
    );
}
}

export default Subtask_Time_Bar;
