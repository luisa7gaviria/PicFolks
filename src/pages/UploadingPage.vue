<template>
  <q-page>
    <section class="page_container">
      <div class="upload-info">
        <h4 ><span style="color: #2B59C3;" >Add</span> a picture to your <span style="color: #6b05c5;" >gallery</span></h4>
        <h6>It will be resized to a 720 pixels width <br> but maintaining its original aspect <br>
         and compressed to a <span style="color: #F03A47;" >.png format</span>. <br> <br>
        Once your picture is uploaded you can see it in your gallery! 
        </h6> 

        <q-btn class="upload-btn" label="Upload" @click="postFileData" ></q-btn>
     </div>


        <div class="input__container">
              <span class="file-name" >{{ fileName }}</span>
              <input class="file-input" type="file" accept="image/*" @change="updateFileName">
        
            <div class="input__guide"> 
                 <q-icon name="cloud_upload" size="80px"/>
                 <p>Drag and Drop</p>
                 <p>or </p> 
                 <strong style="color: #7c1f39;" >Click Here</strong>
            </div>
        </div>      
    </section>
  </q-page>
</template>
  
<script>
  import {useQuasar} from "quasar"
  import { defineComponent, ref } from 'vue'
  import '../css/UploadingPage.css'

  export default defineComponent({
    name: 'UploadingPage',

    setup() {

      const $q = useQuasar()

      const showNotif = (message, color) => {
        $q.notify({
          message: message,
          color: color,
          avatar: '/picfolksicon.png',
          actions: [
            { icon: 'close', color: 'white', handler: () => { /* ... */ } }
          ]
        })
      }

      const fileName = ref('')
      let file

      const updateFileName = (event) => {
        file = event.target.files[0]
        fileName.value = file.name
      }
    
    const postFileData = () => {
      if (!file) {
        showNotif("Please select a file to upload", "pink")
      } else {
      
        const formData = new FormData()
        formData.append("image", file )

      
        fetch("http://127.0.0.1:5001/picfolks/us-central1/setImage", {
          mode: "no-cors",
          method: "POST",
          body: formData
        })
      
        .then(() => { 
          file = null
          fileName.value = ""
          showNotif("The picture was uploaded successfully", "light-blue-9")
        })
        .catch((err) => {
          showNotif("An error occurred" + err.message, "pink")
        })
      }
    }
      return {

        updateFileName,
        postFileData,
        fileName
     
      };
    }
  })
</script>

  
  