
export default function checkPermission (app:any){
    const APP_NAME= 'documentProgram'
    if(app?.[APP_NAME]?.accessPermission === 'permissible' && app?.[APP_NAME]?.versionPermission.includes('all')){
        return true
    }

return false
}
