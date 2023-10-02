import { ref, deleteObject } from "firebase/storage";
import {storage} from "./firebaseconf"

export const deleteImg = (file) => {

  const fileRef = ref(storage, file);

  return deleteObject(fileRef)
  .then(() => "The picture was deleted successfully")
  .catch(err => err)
}
