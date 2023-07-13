import {
  MenuItem,
  ListSubheader,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useContext, useState } from "react";
import { handelOpenImageFile } from "../../../component/FCComponent/browserFile";
import { ITF_drawing } from "../../../interface/interface";
import style from "./LeftSide.module.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { AuthContext } from "../../LoginPage/function/loginContext";
//JSX: Left side component
export default function LeftSide({ prop }: { prop: any }) {
  const arrayDescriptionRender = [1, 2, 3, 4];
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const { authorLogin } = useContext<any>(AuthContext);
  //TODO: handle add image
  const handleAddImage = (id: number) => {
    if (prop?.[`imageArray${id}`].length < 4) {
      const handleNewArray = (image: File) => {
        // prop.imageArray1.push(image)
        prop?.[`setImageArray${id}`]([...prop[`imageArray${id}`], image]);
      };
      handelOpenImageFile(handleNewArray);
    } else {
      setSnackBarOpen(true);
    }
  };
  //TODO_END: handle add image
  //TODO: create Id Code JSX
  const createIdCodeJSXList = () => {
    const idCodeListJSX: any = [
      <MenuItem key={Math.random()} value={"Create New"} color="secondary">
        <span style={{ color: "red" }}>Create New</span>
      </MenuItem>,
    ];
    prop?.idCodeFieldList.forEach((motherCrr: any, motherIndex: number) => {
      idCodeListJSX.push(
        <ListSubheader key={`idCodeListSubHeader-${Math.random()}`} style={{ fontStyle: "italic", color: "#ccc" }}>
          {motherCrr?.groupName}
        </ListSubheader>
      );
      motherCrr?.Current.forEach((element: any, index: number) => {
        console.log("🚀 ~ file: LeftSide.tsx:54 ~ motherCrr?.Current.forEach ~ element:", element)
        let disableWaiting4Approve = false;
        let disableDifferentAuthor = false;
        if(element?.authorId !== authorLogin.userName){ //: kiem tra dung ban ve cua user
          console.log("🚀 ~ file: LeftSide.tsx:59 ~ motherCrr?.Current.forEach ~ element?.authorId:", element?.authorId)
          disableDifferentAuthor = true;
        }
        motherCrr?.New.forEach((elementNew: any, indexNew: number) => {
          if (elementNew.idCode === element.idCode) {
            disableWaiting4Approve = true;
            return;
          }
        });
        idCodeListJSX.push(
          <MenuItem
            key={`idCodeItem-${Math.random()}`}
            value={JSON.stringify(element)}
            color="secondary"
            disabled={disableWaiting4Approve || disableDifferentAuthor}
          >
            <span style={{ color: "red" ,paddingRight: '5px'}}>{element.idCode}</span>
            {disableWaiting4Approve && <span>(waiting for approve)</span>}
            {!disableWaiting4Approve &&  disableDifferentAuthor && <span>({element.author})</span>}
          </MenuItem>
        );
      });
    });

    return idCodeListJSX;
  };

  //TODO_END: create Id Code JSX

  return (
    <section className={style.leftSide}>
      <header className={style.leftSideHeader}>Upload New file</header>
      <FormControl required sx={{ m: 1, Width: 20 }} size="small">
        <InputLabel>Type</InputLabel>
        <Select
          value={prop.selectTypeValue}
          label="Type"
          onChange={(even) => {
            prop?.handleField(even.target.value);
          }}
        >
          {prop.typeList.map((crr:any,index: number)=>{
            return <MenuItem value={JSON.stringify(crr)} key={index}>
            <span style={{ color: crr.color }}>{crr.name}</span>
          </MenuItem>
          })}
         
        </Select>
        {/* <FormHelperText>Required</FormHelperText> */}
      </FormControl>
      {/* /////////////////////////////////////////////////////////// */}
      <div className={style.leftSideArea}>
        <FormControl required sx={{ m: 1, Width: 20 }} size="small" className={style.leftSideAreaForm}>
          <InputLabel>Area</InputLabel>
          <Select
            value={prop.selectAreaValue}
            label="Area"
            onChange={(even) => {
              prop.setSelectAreaValue(even.target.value);
            }}
          >
            {prop?.areaFieldList.map((crr: ITF_drawing, index: number) => {
              const valueAreaObj = {
                id: crr.id,
                name: crr.name,
              };
              return (
                <MenuItem key={index} value={JSON.stringify(crr)}>
                  {crr.name}
                </MenuItem>
              );
            })}
          </Select>
          {/* <FormHelperText>Required</FormHelperText> */}
        </FormControl>
        {/* /////////////////////////////////////////////////////////// */}
        <FormControl required sx={{ m: 1, Width: 20 }} size="small" className={style.leftSideAreaForm}>
          <InputLabel>Local</InputLabel>
          <Select
            value={prop.selectLocalValue}
            label="Local*"
            onChange={(even) => {
              prop.setSelectLocalValue(even.target.value);
            }}
          >
            {prop?.localFieldList.map((crr: any, index: number) => {
              return (
                <MenuItem key={index} value={JSON.stringify(crr)}>
                  {crr.name}
                </MenuItem>
              );
            })}
          </Select>
          {/* <FormHelperText>Required</FormHelperText> */}
        </FormControl>
        {/* /////////////////////////////////////////////////////////// */}
        <FormControl required sx={{ m: 1 }} size="small" className={style.leftSideAreaForm}>
          <InputLabel>Id Code</InputLabel>
          <Select
            value={prop.selectIdCodeValue}
            label="Id Code"
            onChange={(even) => {
              prop.setSelectIdCodeValue(even.target.value);
            }}
          >
            {createIdCodeJSXList()}
          </Select>
          {/* <FormHelperText>Required</FormHelperText> */}
        </FormControl>
      </div>
      {/* /////////////////////////////////////////////////////////// */}
      <div className={style.leftSideIdInput}>
        <FormControl
          required
          sx={{ m: 1, Width: 20 }}
          size="small"
          className={style.leftSideAreaForm}
          disabled={prop?.localGroupDisable}
        >
          <InputLabel>Group</InputLabel>
          <Select
            value={prop.selectGroupValue}
            label="Group"
            onChange={(even) => {
              prop.setSelectGroupValue(even.target.value);
            }}
          >
            {prop?.groupFieldList.map((crr: any, index: number) => {
              return (
                <MenuItem key={index} value={JSON.stringify(crr)}>
                  {crr.name}
                </MenuItem>
              );
            })}
          </Select>
          {/* <FormHelperText>Required</FormHelperText> */}
        </FormControl>

        {/* /////////////////////////////////////////////////////////// */}
        <TextField
          sx={{ m: 1 }}
          size="small"
          //   error
          //   id="outlined-error-helper-text"
          label="Name *"
          value={prop?.nameInputValue}
          //   helperText="Incorrect entry."
          fullWidth
          onChange={(e) => prop?.setNameInputValue(e.target.value)}
        />
        {/* /////////////////////////////////////////////////////////// */}
        {/* <FormControl required sx={{ m: 1, Width: 20 }} size="small" className={style.leftSideAreaForm} disabled>
            <InputLabel>type</InputLabel>
            <Select
              value={prop.selectFileTypeValue}
              label="type"
              onChange={(even) => {
                prop.setSelectFileTypeValue(even.target.value);
              }}
            >
              <MenuItem value={"pdf"}>pdf</MenuItem>
              <MenuItem value={"word"}>word</MenuItem>
              <MenuItem value={"autoCad"}>autoCad</MenuItem>
              <MenuItem value={"other"}>other</MenuItem>
            </Select>
    
          </FormControl> */}
      </div>
      {/* /////////////////////////////////////////////////////////// */}
      <div className={style.leftSideIdInput}>
        <TextField
          sx={{ m: 1, color: "red" }}
          style={{ fontWeight: "600 !important" }}
          size="small"
          //   error
          //   id="outlined-error-helper-text"
          label="Commit *"
          //   defaultValue="no name"
          //   helperText="Incorrect entry."
          value={prop?.commitInput}
          onChange={(e) => prop?.setCommitInput(e.target.value)}
          fullWidth
          required
        />
      </div>
      {/* /////////////////////////////////////////////////////////// */}
      <Box sx={{ m: 1 }}>
        <Typography sx={{ textAlign: "start" }} variant="h6" component="div">
          What is in new change?
        </Typography>
        <List dense={true}>
          {arrayDescriptionRender.map((crr, index) => {
            return (
              <ListItem className={style.leftSideIdInput} key={index}>
                <ArrowRightIcon />
                <TextField
                  //   id="standard-multiline-flexible"
                  //   label="Multiline"
                  multiline
                  //   maxRows={4}
                  variant="standard"
                  fullWidth
                  sx={{ pl: 1, pr: 1 }}
                  value={prop?.[`newChangeInputLine${crr}`]}
                  onChange={(e) => prop?.[`setNewChangeInputLine${crr}`](e.target.value)}
                />
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<AddPhotoAlternateIcon />}
                  onClick={() => {
                    handleAddImage(crr);
                  }}
                >
                  Add
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Box>
      {/* /////////////////////////////////////////////////////////// */}
      <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
        <Alert onClose={() => setSnackBarOpen(false)} severity="warning" sx={{ width: "100%", color: "red" }}>
          Maximum 4 images in this line!
        </Alert>
      </Snackbar>
    </section>
  );
}

//JSX_END: Left side component
