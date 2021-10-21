import { useEffect, useState } from 'react'
import Time_Bar from '../Time_Bar/Task_Time_Bar'

function Progress_bar(props) {

  const [ doneBarLength, setDoneBarLength ] = useState('45px')
  const [ undoneBarLength, setUndoneBarLength ] = useState('45px')
  
  const [ gapBeforeBegining, setgapBeforeBegining ] = useState('45px')
  const [ sumOfBothBarLength, setSumOfBothBarLength ] = useState('45px')
  const [ sumOfBothBarAndGapLength, setSumOfBothBarAndGapLength ] = useState('45px')

  const genbackgroundColor = 'blue'
  const genheight = '12px'
  //const doneBarbackgroundColor = 'grey'
  //const undoneBarbackgroundColor = 'blue'

  //const doneBarLength = '45px'
  //const undoneBarLength = '45px'

  //const holdingBarLength = '90px'

  //const minimumdate = '1/1/2021'

  //

  const { minimumdate, start, end, gantView} = props

  const days_interval_conversion_to_pixel = (days) => {
    if (days < 0 ){
      const conversion = 0
      return conversion
    }
    else {
      const gantViewtype = (gantView == true? 1:11)
      //console.log('gantView:' +gantViewtype)
      const conversion = "" + Math.round((Math.abs(gantViewtype*days))) 
      return conversion
    }
  }

  const  time_conversion = (start,end) => {
    //console.log('start: '+start)
    //console.log('end: '+end)
    //console.log('it entered this function')

    const date1 = new Date(start)
    const presentdate = new Date()
    const date2 = new Date(end)

    //One day in milliseconds
    const oneDay = 1000 * 60 * 60 *24

    //Calculating the time difference between two dates
    let donediffInTime
    let undonediffInTime

    //conditional test to know if the first date has yet to come as compared to 2days date
    if (presentdate.getTime() < date1.getTime()){
      donediffInTime = 0
      undonediffInTime = date2.getTime() - date1.getTime()
    }
    else{
      donediffInTime = presentdate.getTime() - date1.getTime()
      undonediffInTime = date2.getTime() - presentdate.getTime()
    }

    //Calculating the no. of days between two dates
    const donediffInDays = Math.round(donediffInTime / oneDay)
    const undonediffInDays = Math.round(undonediffInTime / oneDay)

    const sumOfBoth = donediffInDays + undonediffInDays

    const donediffInDaysToPixel = days_interval_conversion_to_pixel(donediffInDays)
    const undonediffInDaysToPixel = days_interval_conversion_to_pixel(undonediffInDays) 
    
    const sumOfBothToPixel = days_interval_conversion_to_pixel(sumOfBoth) 

    setDoneBarLength(donediffInDaysToPixel)
    setUndoneBarLength(undonediffInDaysToPixel)
    setSumOfBothBarLength(sumOfBothToPixel)
    setSumOfBothBarAndGapLength(sumOfBothToPixel  + gapBeforeBegining)

    //console.log('setDoneBarLength: '+donediffInDaysToPixel)
    //alert('setUndoneBarLength: '+undonediffInDays)

    //console.log(getNumbersOfDays("2/1/2021", "3/1/2021"))
    
  }

  const  time_conversion_minimum_date = (minimumdate, start) => {
    //console.log('minimumdate: '+minimumdate)
    const date1 = new Date(minimumdate)
    const date2 = new Date(start)

    //One day in milliseconds
    const oneDay = 1000 * 60 * 60 *24

    //Calculating the time difference between two dates
    const diffInTime = date1.getTime() - date2.getTime()

    //Calculating the no. of days between two dates
    let donediffInDays = Math.round(diffInTime / oneDay)

    donediffInDays = Math.abs(donediffInDays)

    const donediffInDaysToPixel = days_interval_conversion_to_pixel(donediffInDays)

    setgapBeforeBegining(donediffInDaysToPixel)

    //console.log("setgapBeforeBegining: "+donediffInDaysToPixel)
    //console.log(getNumbersOfDays("2/1/2021", "3/1/2021"))    
  }

  useEffect(() => {      

      time_conversion(start, end) 
      time_conversion_minimum_date(minimumdate, start)

  }, [gantView]) 

  return (
    <div style={{ minWidth: sumOfBothBarAndGapLength+'px'/* ,backgroundColor: 'green' */}}>      
    <div style={{ position: 'relative', left: gapBeforeBegining+'px', padding: '3px', height: genheight, minWidth: sumOfBothBarLength+'px'}}>
        <Time_Bar timeChange={props.timeChange} entireTimes={props.entireTimes} times={props.times} timeView={props.timeView}
          startdate={start} enddate={end}/>
        <div style={{ display: 'inline-block', backgroundColor: '#E601DDA1', height: genheight, width: doneBarLength +'px'}}> </div>
        <div style={{ display: 'inline-block', backgroundColor: '#E601DD', height: genheight, width: undoneBarLength+'px'}}></div>        
    </div>
    </div>
  );
}

export default Progress_bar;
