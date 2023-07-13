import style from './ModalImageShow.module.css'

export function ModalImageShow ({modalImageOpen, setModalImageOpen}:{modalImageOpen:any, setModalImageOpen:Function}){
    //TODO: handle change image main view
    const handelChangeImageMainView = (image:string)=>{
        const mainImageElm = document.getElementById('viewPort2ModalImageMainView') as HTMLImageElement
        mainImageElm!.src =  image

    }
    //TODO_END: handle change image main view
    return <div className={style.mainContainer} >
        <span className={style.closeButton} onClick={()=>setModalImageOpen({isOpen: false})}>Close</span>
        <div className={style.mainImage}>
            <img src={modalImageOpen?.data?.[0]} className={style.mainImageItem} id='viewPort2ModalImageMainView'/>
        </div>
        <div className={style.sideImage}>
            {modalImageOpen.data.map((crr:string,index:number)=>{
                return <div className={style.sideImageItem} key={index}>
                    <img className={style.sideImageItemImg} src={crr} onClick={()=>handelChangeImageMainView(crr)}/>
                </div>
            })}
        </div>
    </div>
}