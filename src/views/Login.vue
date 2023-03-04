<template>
    <div class="h-screen grid place-content-center">
        <div class="p-10 card bg-base-200">
            <h1 class="font-bold text-center font-mono">Sign in and plan</h1>
            <div class="mx-auto p-6">
                <button class="btn bg-orange-600 mx-5" @click="signInWithGoogle">Sign in with google</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth"

const authStore = useAuthStore()

const signInWithGoogle = () => {
    authStore.googleLogin()
}

</script>
