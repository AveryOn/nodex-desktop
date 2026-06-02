import '~/renderer/src/styles/normalize.css'

import { createApp } from 'vue'
import App from '~/renderer/src/App.vue'
import router from '~/renderer/src/router'
import { createPinia } from 'pinia'
// import { EnvBootstrapEnum } from '~/shared/const'
// import { EnvBootstrap } from '~/shared/env'

// Валидация env-переменных клиента
// EnvBootstrap(EnvBootstrapEnum.RENDERER)

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
