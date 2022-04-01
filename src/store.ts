import {
  createStore,
} from "vuex";

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ServerView from './views/ServerView.vue'
import Details from './views/ServerViews/Details.vue'
import Ressources from './views/ServerViews/Ressources.vue'
import Logs from './views/ServerViews/Logs.vue'
import Advanced from './views/ServerViews/Advanced.vue'
import Export from './views/ServerViews/Export.vue'
import AddServer from './views/AddServer.vue'

const store = createStore({
    state: {
        isLoggedIn: false
    },
    getters: {
        isLoggedIn: state => state.isLoggedIn,
    },
    mutations: {
        LogIn (state) {
            state.isLoggedIn = true;
        }
    }
})

export default store;