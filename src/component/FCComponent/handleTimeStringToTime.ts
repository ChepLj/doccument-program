function handleStringToTime (type:string, input:string){
    var dateFormat= new Date(+input)
    let timeResult = dateFormat.getDate()+"/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear()+" "+dateFormat.getHours()+":"+dateFormat.getMinutes()+":"+dateFormat.getSeconds()
    if(type=== 'date only'){
        timeResult = dateFormat.getDate()+"/"+(dateFormat.getMonth()+1)+"/"+dateFormat.getFullYear()
        return timeResult 
    }
    return timeResult
}

export default handleStringToTime