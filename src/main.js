import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import matchNavigatorLanguage from './helpers/matchNavigatorLanguage.js'
import './main.css'

import './helpers/vue3DragEvents.js'

createApp(App)
  .use(store)
  .use(router)
  .mount('body')

const initialLoad = async () => {
    store.dispatch('setLoading', true)
    store.dispatch('language', matchNavigatorLanguage(['en', 'pt']))
    await store.dispatch('loadContent')
    await store.dispatch('loadTranslations')
    store.dispatch('setLoading', false)
}

initialLoad()