import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import "./Firebase"
import './index.css'

import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

const app = createApp(App)

const options = {
    position: "top-left",
    transition: "Vue-Toastification__slideBlurred",
    maxToasts: 25,
    timeout: 2000,
    newestOnTop: true,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
};

app.use(Toast, options);

app.use(createPinia())


app.use(router)

app.mount('#app')
