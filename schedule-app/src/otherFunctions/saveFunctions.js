import { saveProject } from "./api"

export const onlineUpdate =()=>{
    setLoading(true)
    const response = await saveProject(newproject)
    if(response == null || 'unsuccessful'){
        const backup = []
        backup = localStorage.getItem('online-backup')
        backup.push(newproject)
        localStorage.setItem('online-backup', backup)
    }

}