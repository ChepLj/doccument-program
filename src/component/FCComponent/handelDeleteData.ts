import { database } from "../../api/firebase/firebaseConfig";
import { ref, remove } from "firebase/database";

export default function handleDeleteData(refInput: string,mainPageContext:any ) {
  const reference = ref(database, refInput);
  remove(reference)
    .then(() => {
      window.history.pushState(refInput.split('/'),'','/')
      mainPageContext.setRefreshState(Math.random())
    })
    .catch(() => alert("something is wrong ! can not delete this item ."));
}
