<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <AppFooter/>
  </q-layout>

</template>

<script>

import { defineComponent} from 'vue'
import AppFooter from 'src/components/AppFooter.vue';
import '../css/app.css'

export default defineComponent({
    name: 'MainLayout',
    components: { AppFooter }

})
</script>
