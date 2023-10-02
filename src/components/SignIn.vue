<template>
    
  <q-input
    filled
    v-model="email"
    label="Email Address *"
    hint="Please type a valid email address"
  />

  <q-input 
    v-model="password" 
    filled :type="isPwd ? 'text' :'password' " 
    label="Password *"
    hint="Must be 8 or more characters and contain at least one number"
    >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility' : 'visibility_off'"
            class="q-icon-eye"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>  

    <div >
      <q-btn label="Create your PicFolks account" type="submit" class="submit-btn" @submit.prevent = "onSubmit" />
    </div>

</template>

<script>
import { defineComponent, ref } from 'vue';
import { createUser } from 'src/utils/session';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'SigIn',
    setup() {
        const email = ref('')
        const password = ref('')
        const isPwd = ref(false)
        const router = useRouter()

        const onSubmit = () => {
            createUser(email.value, password.value).then(() => router.push('/user/upload'))
        }

        return {
            email,
            password,
            isPwd,
            onSubmit
        }
    }
})
</script>