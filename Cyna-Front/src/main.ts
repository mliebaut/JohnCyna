import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.css'

import { Chart as ChartJS, registerables } from 'chart.js'
ChartJS.register(...registerables)


const Serv_Url = 'http://127.0.0.1:3001'
export default Serv_Url;

const pinia = createPinia();
const app = createApp(App)

pinia.use((context) => {

    const storeId = context.store.$id

    const serilizer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }

    const fromStorage = serilizer.deserialize(window.localStorage.getItem(storeId))

    if (fromStorage) {
        context.store.$patch(fromStorage)
    }

    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serilizer.serialize(state))
    })
})

app.use(router)
app.use(pinia)
app.mount('#app')
