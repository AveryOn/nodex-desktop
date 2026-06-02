import '~/renderer/src/styles/normalize.css'

import { createApp } from 'vue'
import App from '~/renderer/src/App.vue'
import router from '~/renderer/src/router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
