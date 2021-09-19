export function generateWeeks(arrayToCheck) {

    const placeholderString = arrayToCheck
    const output = placeholderString.split(' ')
    //console.log('first Part: ' +output[0])

    switch(output[0]){
        case"Sun":
            return (
      
                <div className="Weeks-Headings-Container"> 
                    <ul className="Tasks-Headings-ul" >
                        <li className="W-H-C-SunAndSat">S</li><li>M</li><li>T</li><li>W</li><li>T</li><li>F</li>
                        <li className="W-H-C-SunAndSat">S</li>
                    </ul>
                </div>
        
            ) 
            break;
        case"Mon":
            return (
      
                <div className="Weeks-Headings-Container"> 
                    <ul className="Tasks-Headings-ul" >
                        <li>M</li><li>T</li><li>W</li><li>T</li><li>F</li>
                        <li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li>
                    </ul>
                </div>
        
            ) 
            break;
        case"Tue":
            return (
      
                <div className="Weeks-Headings-Container"> 
                    <ul className="Tasks-Headings-ul" >
                        <li>T</li><li>W</li><li>T</li><li>F</li>
                        <li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li><li>M</li>
                    </ul>
                </div>
        
            ) 
            break;
        case"Wed":
                return (
          
                    <div className="Weeks-Headings-Container"> 
                        <ul className="Tasks-Headings-ul" >
                            <li>W</li><li>T</li><li>F</li>
                            <li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li><li>M</li><li>T</li>
                        </ul>
                    </div>
            
                ) 
                break;
        case"Thu":
                return (
        
                    <div className="Weeks-Headings-Container"> 
                        <ul className="Tasks-Headings-ul" >
                            <li>T</li><li>F</li><li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li>
                            <li>M</li><li>T</li><li>W</li>
                        </ul>
                    </div>
            
                ) 
                break;
        case"Fri":
                return (
        
                    <div className="Weeks-Headings-Container"> 
                        <ul className="Tasks-Headings-ul" >
                            <li>F</li><li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li>
                            <li>M</li><li>T</li><li>W</li><li>T</li>
                        </ul>
                        <hr className="Horizontal-Line"></hr>
                    </div>
            
                ) 
                break;
        case "Sat":
                return (
        
                    <div className="Weeks-Headings-Container"> 
                        <ul className="Tasks-Headings-ul" >
                            <li className="W-H-C-SunAndSat">S</li><li className="W-H-C-SunAndSat">S</li>
                            <li>M</li><li>T</li><li>W</li><li>T</li><li>F</li>
                        </ul>
                    </div>
            
                ) 
                break;
    }//end switch
    
  }//end function