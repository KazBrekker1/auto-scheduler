<template>
  <nav
    class="navbar sticky top-5 z-10 m-4 mx-auto w-3/4 justify-around shadow-lg rounded-box bg-neutral text-neutral-content">
    <router-link class="btn btn-ghost btn-sm rounded-btn" v-if="loggedIn" to="/">Schedule</router-link>
    <router-link class="btn btn-ghost btn-sm rounded-btn" v-if="loggedIn" to="/organizer">Organizer</router-link>
    <router-link class="btn btn-ghost btn-sm rounded-btn" v-if="!loggedIn" to="/login">Login</router-link>
    <button class="btn btn-error btn-sm rounded-btn" v-if="loggedIn" @click="signOut">Sign Out</button>
  </nav>
  <router-view />
</template>

<script setup>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from "./stores/auth"
import { onMounted, ref } from "vue"
import router from './router';

let authStore = useAuthStore();
let loggedIn = ref(false)

const signOut = () => {
  authStore.logout();
}

let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, user => {
    if (user) {
      authStore.isLoggedIn = true
      authStore.loggedInUser = user
      router.push("/")
    } else {
      authStore.isLoggedIn = false
      authStore.loggedInUser = {}
      router.push("/login")
    }
    loggedIn.value = authStore.isLoggedIn
  })
})
</script>

<style>
#map {
  height: 100vh;
}
</style>