import './assets/main.css'

import App from './App.vue'
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
