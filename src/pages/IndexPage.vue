<template>
  <q-page class="flex" >
    <section class="flex" >
      <img src="../assets/picfolkslogo.png" class="index-page__img" >
    
      <div class="picfolks-slogan"  >
       <h4> Capture, <span style="color: #2B59C3;" >Share</span>, Connect </h4>
       <h5> Your Photographic Gallery <br> on <span style="color: #6b05c5;"> PicFolks </span> </h5>
      </div>

      <div class="q-pa-md flex flex-center" id="q-form__container">

      <q-form
      class="q-gutter-md "
      >
      <q-img src="/picfolksicon.png" width="32px" class="form-icon"></q-img>

      <q-btn class="logBtn" 
      label ="Log In" 
      @click="showLoginForm" 
      :style="logInBtnColor"
      />

      <q-btn class="signBtn" 
      label="Sign Up" 
      @click="showSignIn" 
      :style="signInBtnColor"
      />
      
      <LogIn v-if="showLogin" />
      <SignIn v-else />
      </q-form>

      </div>
    </section>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue';
import '../css/IndexPage.css';
import SignIn from 'src/components/SignIn.vue';
import LogIn from 'src/components/LogIn.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { SignIn, LogIn },

  data() {
    return {
      showLogin: true,
    }
  },
  methods: {
    showLoginForm() {
      return this.showLogin = true;
    },
    showSignIn() {
      return this.showLogin = false;
    }
  },
  computed : {
    logInBtnColor(){
      return this.showLogin 
      ? {background: 'linear-gradient(to top, #FFFCF2 ,#B569F7)' } 
      : {backgroundColor: "white"}
    },
    signInBtnColor(){
      return this.showLogin 
      ? {backgroundColor: "white"} 
      : {background: 'linear-gradient(to top, #FFFCF2, #B569F7)'}
    }
  }
  
})
</script>
