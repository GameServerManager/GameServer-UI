import {
 createWebHistory,
 createRouter
} from "vue-router";

import HelloWorld from './views/HelloWorld.vue'
import ServerView from './views/ServerView.vue'
import Details from './views/ServerViews/Details.vue'
import Ressources from './views/ServerViews/Ressources.vue'
import AddServer from './views/AddServer.vue'


const history = createWebHistory();
const routes = [
    { name: 'HelloWorld',path: '/', component: HelloWorld },
    { name: 'Server',path: '/Server/:id', component: ServerView, children: [
        {
          name: 'Details', path: 'Details', component: Details
        },
        {
          name: 'Ressources', path: 'Ressources', component: Ressources
        }
      ]
    },
    { name: 'AddServer',path: '/AddServer', component: AddServer },
];
const router = createRouter({
  history,
  routes
});
export default router;