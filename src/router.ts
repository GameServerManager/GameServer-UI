import {
 createWebHistory,
 createRouter
} from "vue-router";

import HelloWorld from './views/HelloWorld.vue'
import ServerView from './views/ServerView.vue'
import Details from './views/ServerViews/Details.vue'
import Ressources from './views/ServerViews/Ressources.vue'
import Logs from './views/ServerViews/Logs.vue'
import Advanced from './views/ServerViews/Advanced.vue'
import Export from './views/ServerViews/Export.vue'
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
        },
        {
          name: 'Logs', path: 'Logs', component: Logs
        },
        {
          name: 'Advanced', path: 'Advanced', component: Advanced
        },
        {
          name: 'Export', path: 'Export', component: Export
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