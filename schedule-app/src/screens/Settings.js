
import './styles/Settings.css';
import './styles/Common.css';

import { Link } from 'react-router-dom';

function Settings() {
  return (
    <div className="Entire-Body"> 

      <div className="Heading-Container">

        <div>
          <icon/>
          <header className="h1">
            Back
          </header>
        </div> 

        <div className="Subtittles-Container">
        
          <div className="Project-Tittle-Add-Task-Container">
            <header className="h2">
              Time Categories
            </header>
            <div className="Float-Right">
              <icon/>
              <button className="Button Button-Blue">
                New Category
              </button>            
            </div>
          </div>
            
        </div>
 

        <hr className="Horizontal-Line"></hr>

      </div>

      <div className="Table-Entire-Container">

        
      </div>       

  </div>
  );
}

export default Settings;
