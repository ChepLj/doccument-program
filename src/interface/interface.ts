export interface ITF_drawing {
id: string,
name: string,
item?: ITF_drawing[]
}

export interface ITF_drawingContent {}

export interface ITF_drawingContentItem {
  idCode: string;
  logsKey?: string | number;
  name: string;
  type?: string;
  author?: string;
  authorId?: string | number;
  dateUpdate?: string;
  version?: string;
  status?: string;
  size?: number;
  commit?: string;
  path?:string;
  ref?:string;
  lock?:string;
  lockMessenger?:string;
  detail?: {
    imageRef: string,
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
  urlFileStore?: {
    fileRef:string,
    fileURL: string,
  };
  available?: string;
  groupStyle?: ITF_Area;
  areaField?: ITF_Area;
  groupField?: ITF_Area;
  localField?: ITF_Area;
  accessRights?: string[],
  
}

export interface ITF_Area {
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
  New: {key:string,keyChild:string}[],
  Current: {key:string,keyChild:string}[],
  id?: string,
  groupName?: string
}

export interface ITF_UploadContainer {
  ref: string;
  data: any;
}

export interface ITF_AuthorLogin {
  displayName: string;
  email:string;
  photoURL:string;
  provider:string;
}