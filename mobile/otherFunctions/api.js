let url ="https://hafeez-schedule-app.herokuapp.com" 
// "http://localhost:3000"|| 
export const getRequest = async ( branch, body ) => {
    var read = await fetch( url + '/projects',{
      "body": body
    })
      return read.json() 
}