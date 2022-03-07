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
        // login(email, password) {
        //     const auth = getAuth()
        //     signInWithEmailAndPassword(auth, email, password)
        //         .then(data => {
        //             this.loggedInUser = auth.currentUser
        //         }).catch(error => {
        //             console.log(error.message)
        //         })
        // },
        // regiser(email, password) {
        //     const auth = getAuth()

        //     createUserWithEmailAndPassword(auth, email, password)
        //         .then(data => {
        //             this.loggedInUser = auth.currentUser
        //         }).catch(error => {
        //             console.log(error.message)
        //         })
        // },
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