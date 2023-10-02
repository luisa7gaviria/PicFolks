 import { storage } from './firebaseconf';
 import { ref, list, getDownloadURL } from 'firebase/storage';
 
export const retrieveImg = async() =>  {
  const storageRef = ref(storage)
  
  const filesList = await list(storageRef);
   
  return Promise.all(filesList.items.map(async (item) => {
    const downloadUrl = await  getDownloadURL(item)

    item.downloadUrl = downloadUrl
    return item 
  }))
  
}