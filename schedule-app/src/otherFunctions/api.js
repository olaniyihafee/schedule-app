/* const electron = require('electron')
const net = electron.remote.net */
//let url ="http://localhost:3000"
let url ="https://hafeez-schedule-app.herokuapp.com" 

export const getProjects = async (options = {}) => {
  const { timeout = 10000 } = options

  const controller = new AbortController();
  const id = setTimeout(()=> controller.abort(), timeout)
    var read = await fetch(url + '/projects',{
                  "method": 'GET',
                  "headers": {
                    "content-type": "application/json"
                  },
                  ...options,
                  signal: controller.signal
                });
                clearTimeout(id)
      return read.json() 
} 

export const saveProject = async (body, options = {}) => {  
  const { timeout = 8000 } = options

  const controller = new AbortController();
  const id = setTimeout(()=> controller.abort(), timeout)
  var read = await fetch(url + '/project',{
      "method": 'POST',
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify(body),
      ...options,
      signal: controller.signal
    });
    clearTimeout(id)
    return read.json() 
}

/* export const getProjects = async (body, options = {}) => { 
  var read = await fetch(url + '/projects',{
      "method": 'GET',
      "headers": {
        "content-type": "application/json"
      },
      "body": JSON.stringify(body),
      rejectUnauthorized: false,
    }
     );
    return read.json() 
} */

export const saveTask = async (body) => {
  fetch(url + '/task',{
      "method": 'POST',
      "headers": {
        "content-type": "application/json"
      },
      "body": body
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      localStorage.setItem('my-test', JSON.stringify(response));
    })
    .catch(err => {console.log(err);}); 
}
export const saveSubtask = async (body) => {
  fetch(url + '/subtask',{
      "method": 'POST',
      "headers": {
        "content-type": "application/json"
      },
      "body": body
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      localStorage.setItem('my-test', JSON.stringify(response));
    })
    .catch(err => {console.log(err);}); 
}


export const editProject = async (body) => {
  fetch(url + '/edit_project',{
      "method": 'POST',
      "headers": {
        "content-type": "application/json"
      },
      "body": body
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      localStorage.setItem('my-test', JSON.stringify(response));
    })
    .catch(err => {console.log(err);}); 
}
export const editTask = async (body) => {
  fetch(url + '/edit_task',{
      "method": 'POST',
      "headers": {
        "content-type": "application/json"
      },
      "body": body
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      localStorage.setItem('my-test', JSON.stringify(response));
    })
    .catch(err => {console.log(err);}); 
}
export const editSubtask = async (body) => {
  fetch(url + '/edit_subtask',{
      "method": 'POST',
      "headers": {
        "content-type": "application/json"
      },
      "body": body
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      localStorage.setItem('my-test', JSON.stringify(response));
    })
    .catch(err => {console.log(err);}); 
}