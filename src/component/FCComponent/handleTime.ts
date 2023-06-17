function handleNowTime (type?:string){
    var dateFormat= new Date()
    let timeResult = dateFormat.getDate()+"/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear()+" "+dateFormat.getHours()+":"+dateFormat.getMinutes()+":"+dateFormat.getSeconds()
    if(type=== 'date only'){
        timeResult = dateFormat.getDate()+"/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear()
        return timeResult 
    }
    return timeResult
}

export default handleNowTime