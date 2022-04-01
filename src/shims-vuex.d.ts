import store from './store'
import {
  Store,
} from "vuex";
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<{
        isLoggedIn: boolean;
    }>;
  }
}
