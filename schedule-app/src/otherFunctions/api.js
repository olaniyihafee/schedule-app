
let url ="http://localhost:3000/projects"

export const getProjects = async () => {
    var read = await fetch(url,{
                  "method": 'GET',
                  "headers": {
                    "content-type": "application/json"
                  },
                })
      return read.json() 
}

export const saveProjects = () => {
    fetch(url,{
        "method": 'POST',
        "headers": {
          "content-type": "application/json"
        },
      })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        localStorage.setItem('my-test', JSON.stringify(response));
      })
      .catch(err => {console.log(err);}); 
}