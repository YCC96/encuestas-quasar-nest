import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
}


export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store({
    state: {
      banLisDetNuevo: 0
    },
    getters: {
      getBanLisDetNuevo: state => {
        return state.banLisDetNuevo;
      }
    },
    mutations: {
      setBanLisDetNuevo(state, payload){
        state.banLisDetNuevo = payload;
      }
    }
  });

  return Store;
});

/**
 * 


export default store(function ({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
 */
