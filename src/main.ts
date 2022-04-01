import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createStore } from 'vuex'

// Create a new store instance.

let app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');