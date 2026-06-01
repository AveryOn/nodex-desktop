import '~/renderer/src/styles/normalize.css'

import { createApp } from 'vue'
import App from '~/renderer/src/App.vue'
import router from '~/renderer/src/router'

createApp(App).use(router).mount('#app')
