import { defineStore } from "pinia";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth"


export const useAuthStore = defineStore("auth", {
    state: () => {
        return {
            loggedInUser: {},
            isLoggedIn: false
        }
    },
    actions: {
        googleLogin() {
            const provider = new GoogleAuthProvider()
            signInWithPopup(getAuth(), provider)
                .then(result => {
                    this.loggedInUser = result.user
                }).catch(error => {
                    console.log(error.message);
                })
        },
        logout() {
            const auth = getAuth()
            signOut(auth)
        },
    }
})