<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 "> 
    <q-page-container>
      <q-header elevated class="q-header-layout">
          <q-toolbar inset>
            <q-img
            src="/picfolksicon.png"
            heigth="32px"
            width="32px"
            ></q-img>
              <q-toolbar-title>
                  <p style="margin: 10px;"> Welcome, <strong>{{ user }}</strong>! </p>
              </q-toolbar-title>
            
              <q-space/>
              <q-btn unelevated label="Upload a Picture" to="/user/upload" class="uploadPage-btn"></q-btn>
              
              <q-btn unelevated label="My Gallery" to="/user/my-gallery" class="myGallery-btn" ></q-btn>
              <q-space></q-space>
              <q-btn  label="Sign Out" @click="onSignOut" class="sign-out-btn"/>
          </q-toolbar>
      </q-header>

     <router-view />
              
    </q-page-container>
    <AppFooter/>
  </q-layout>
</template>

<script>
import AppFooter from 'src/components/AppFooter.vue';
import { defineComponent } from 'vue';
import { userSignOut } from 'src/utils/session';
import { useRouter } from 'vue-router';
import { auth } from 'src/utils/firebaseconf';


export default defineComponent({
  name: 'UserLayout',
  components: { AppFooter },
 
  setup() {

    const router = useRouter()

      const user = auth.currentUser.email.slice(0, -10)

      const onSignOut = () => {
        userSignOut().then(() => router.push('/'))
      };

      return {
          onSignOut,
          user
      };
  }
});
</script>
