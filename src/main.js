import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router.js";
import store from "./vuex/store.js";

const app = createApp(App)

// Autoloader des composants commençant par "Base"
const requireComponent = require.context(
  './components/base-components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
  app.component(componentName, componentConfig.default || componentConfig)
})

// Création de l'app

app.use(store).use(router).mount('#app')
