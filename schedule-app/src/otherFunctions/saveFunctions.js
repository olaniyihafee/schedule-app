import { saveProject } from "./api"

/* export const onlineUpdate =()=>{
    setLoading(true)
    const response = await saveProject(newproject)
    if(response == null || 'unsuccessful'){
        const backup = []
        backup = localStorage.getItem('online-backup')
        backup.push(newproject)
        localStorage.setItem('online-backup', backup)
    }

} */

 export const onlineBackUp =(onlineBackUp)=>{
    onlineBackUp.forEach( async(eachBackUp, index)=>{
        if(eachBackUp.type == 'unsavedOnlineProject'){
            const response = await saveProject(eachBackUp.body)
            return response
        }
    })
} 

export const placeInLocalBackUp =( content, savetype)=>{

    let backedup = []
    backedup = localStorage.getItem('backUpToPushOnline') 
    let backedupParse = []
    backedupParse = (JSON.parse(backedup) !== null ? JSON.parse(backedup) : [])

    let placeholder = {}
    if(savetype == 'newProjectWithoutTime'){
        placeholder = {
            type: savetype,
            index: (backedupParse !== null ? backedupParse.length + 1 : 1), //necessary to effectively remove it after it has been saved online
            body: content
        }
    }
    else{
        placeholder = {
            type: savetype,
            body: content
        }
    }
        
    backedupParse.push(placeholder)
    localStorage.setItem('backUpToPushOnline', JSON.stringify(backedupParse))
}