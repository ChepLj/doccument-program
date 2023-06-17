export interface ITF_drawing {
id: string,
name: string,
item?: ITF_drawing[]
}

export interface ITF_drawingContent {}

export interface ITF_drawingContentItem {
  idCode: string;
  name: string;
  type?: string;
  author?: string;
  dateUpdate?: string;
  version?: string;
  status?: string;
  size?: number;
  commit?: string;
  detail?: {
    line1:{
      text: string;
      attachment: any;
    },
    line2:{
      text: string;
      attachment: any;
    },
    line3:{
      text: string;
      attachment: any;
    },
    line4:{
      text: string;
      attachment: any;
    }
    
  };
  urlFileStore?: string;
  available?: string;
  groupArea?: ITF_Area;
  rootArea?: ITF_Area;
  motherArea?: ITF_Area;
  localArea?: ITF_Area;
  accessRights: string[],
  
}

interface ITF_Area {
  id: string;
  name: string;
}

export interface ITF_TempObject {
  [key: string]: Array<string>[];
}


export interface ITF_ObjFilter {
  '01':ITF_ObjFilterArray,
  '02':ITF_ObjFilterArray,
  '03':ITF_ObjFilterArray,
  '04':ITF_ObjFilterArray,
  '05':ITF_ObjFilterArray,

}
export interface ITF_ObjFilterArray{
  New: string[],
  Current: string[],
  id?: string,
  groupName?: string
}