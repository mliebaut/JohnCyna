import App from './App.vue'
import { createApp } from 'vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
// @ts-ignore
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import { createI18n } from 'vue-i18n'
import fr from './locales/fr'
import en from './locales/en' 

import { Chart as ChartJS, registerables } from 'chart.js'
ChartJS.register(...registerables)

const Serv_Url = 'http://127.0.0.1:3001'
export default Serv_Url

const pinia = createPinia()
const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    fr,
    en
  }
})

pinia.use((context) => {
  const storeId = context.store.$id

  const serilizer = {
    serialize: JSON.stringify,
    deserialize: JSON.parse
  }

  const fromStorage = serilizer.deserialize(
    window.localStorage.getItem(storeId)
  )

  if (fromStorage) {
    context.store.$patch(fromStorage)
  }

  context.store.$subscribe((mutation, state) => {
    window.localStorage.setItem(storeId, serilizer.serialize(state))
  })
})

app.use(pinia)
app.use(router)
app.use(pinia)
app.use(BootstrapVue3)
app.use(i18n)
app.mount('#app')
