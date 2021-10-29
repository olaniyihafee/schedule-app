 let url ="https://hafeez-schedule-app.herokuapp.com" 
//let url ="http://localhost:3000"
export const getRequest = async (body, options = {}) => {  
  const { timeout = 8000 } = options

  const controller = new AbortController();
  const id = setTimeout(()=> controller.abort(), timeout)
  var read = await fetch( url + '/projects',{
      "body": body,
      ...options,
      signal: controller.signal
    });
    clearTimeout(id)
    return read.json() 
}