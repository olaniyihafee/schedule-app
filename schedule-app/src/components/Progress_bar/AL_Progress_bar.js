import { useEffect, useState } from 'react'


function AL_Progress_bar(props) {

  const [ doneBarLength, setDoneBarLength ] = useState('45px')
  const [ undoneBarLength, setUndoneBarLength ] = useState('45px')
  
  const [ gapBeforeBegining, setgapBeforeBegining ] = useState('45px')

  const genbackgroundColor = 'blue'
  const genheight = '12px'
  //const doneBarbackgroundColor = 'grey'
  //const undoneBarbackgroundColor = 'blue'

  //const doneBarLength = '45px'
  //const undoneBarLength = '45px'

  //const holdingBarLength = '90px'

  //const minimumdate = '1/1/2021'

  //

  const { minimumdate, start, end} = props

  const days_interval_conversion_to_percent = (mainDays, otherDays) => {
    const calculation = ( mainDays / ( mainDays + otherDays ) ) *100
    const conversion = "" + Math.round((Math.abs(calculation))) +'%'
    return conversion
  }

  const  time_conversion = (start,end) => {
    console.log('start: '+start)
    console.log('end: '+end)
    //console.log('it entered this function')

    const date1 = new Date(start)
    const presentdate = new Date()
    const date2 = new Date(end)

    //One day in milliseconds
    const oneDay = 1000 * 60 * 60 *24

    //Calculating the time difference between two dates
    const donediffInTime = presentdate.getTime() - date1.getTime()
    const undonediffInTime = date2.getTime() - presentdate.getTime()

    //Calculating the no. of days between two dates
    const donediffInDays = Math.round(donediffInTime / oneDay)
    const undonediffInDays = Math.round(undonediffInTime / oneDay)

    const donediffInDaysToPixel = days_interval_conversion_to_percent(donediffInDays,undonediffInDays)
    const undonediffInDaysToPixel = days_interval_conversion_to_percent(undonediffInDays, donediffInDays)    

    setDoneBarLength(donediffInDaysToPixel)
    setUndoneBarLength(undonediffInDaysToPixel)

    console.log('setDoneBarLength: '+donediffInDaysToPixel)
    console.log('setUndoneBarLength: '+undonediffInDaysToPixel)

    //console.log(getNumbersOfDays("2/1/2021", "3/1/2021"))
    
  }


  useEffect(() => {      

      time_conversion(start, end) 

  }, []) 

  return (
    <div style={{ width: '60%' /* ,backgroundColor: 'green' */, float: 'right', margin: 'auto 0px' }}>    
        
        <div style={{ display: 'inline-block', backgroundColor: 'grey', height: genheight, width: doneBarLength }}> </div>
        <div style={{ display: 'inline-block', backgroundColor: 'black', height: genheight, width: undoneBarLength}}></div>        
   
    </div>
  );
}

export default AL_Progress_bar;
