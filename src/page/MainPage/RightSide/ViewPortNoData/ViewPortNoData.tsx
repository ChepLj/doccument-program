import { useEffect } from "react";
import nodataImg from '../../../../media/image/No data-pana.png'

export default function ViewPortNoData() {
    console.log("%cViewPortNoData Page mount", "color:green");
    useEffect(() => {
      //: Unmount
      return () => {
        console.log("%cViewPortNoData Page Unmount", "color:red");
      };
    }, []);

    return (
      <section style={{width: '100%', height: '100%' , display: 'flex', justifyContent:'center', alignItems: 'center'}}>
        <img src={nodataImg} style={{ maxHeight: '50%' , maxWidth: '50%',     objectFit: 'contain'}}/>
      </section>
    );
  }