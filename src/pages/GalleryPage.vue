<template>
  <q-page class="flex  gallery-page">
    
    <h3> <span style="color: #6b05c5;" >Explore</span> all your pictures, 
      <span style="color: #2B59C3;"> download </span> or <span style="color: #F03A47;"> delete </span>
       whatever you want!</h3>

    <section class="picture-section">
      <PictureCard :pictureData="pictureData" @picture-deleted="handleDeletedPic" />
    </section>
  </q-page>
</template>

<script>
import PictureCard from "../components/PictureCard.vue";
import { defineComponent} from 'vue';
import { retrieveImg } from "src/utils/retrieveData";
import "../css/GalleryPage.css";

export default defineComponent({
  name: 'GalleryPage',
  components: { PictureCard },

  data() {
    return {
      pictureData: [],
    };
  },

  async mounted() {
      this.pictureData = await retrieveImg();  
  },

  methods: {
    handleDeletedPic(deletedPic) {
      this.pictureData = this.pictureData.filter(pic => pic.name !== deletedPic.name)
    }
  }
});
</script>
