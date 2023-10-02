<template>
    <div class="card-container" v-for="picture in pictureData" :key="picture.path">
      <q-img 
      :ratio="16/9"
      class="picture" 
      :src="picture.downloadUrl">
        <div class="absolute-full text-subtitle2 flex flex-center picture__caption">
          <p>{{ picture.name }}</p>
            <div>
              <q-btn  unelevated icon="img:src\assets\downloadIcon.png" 
              label="Download" @click="downloadImg(picture.downloadUrl, picture.name)"/>

              <q-btn unelevated icon="img:src\assets\deleteIcon.png" label="Delete" @click="handleDeleteImg(picture)"/>
            </div>
        </div>
      </q-img>
      
    </div>
  </template>
  
  <script>
  import { defineComponent } from "vue";
  import { deleteImg } from "src/utils/deleteImg";
  
  export default defineComponent({
    name: "PictureCard",
    emits: ["picture-deleted"],

    methods: {
        downloadImg(url, name) {
            const a = document.createElement("a");
            a.href = url;
            a.download = name; 
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
        handleDeleteImg(file) {
            deleteImg(file.name).then(() => {
                this.$emit("picture-deleted", file);
            }).catch(err => err)
        }

    },
    props: {
      pictureData: {
        type: Array,
        required: true,
      },
    },
  });
  </script>
  