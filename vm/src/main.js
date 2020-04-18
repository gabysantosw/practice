// IMPORTS
// core vue
import Vue from 'vue'

// libraries
import './plugins/fontawesome'

// main app
import App from './App.vue'

// extras from vue
import router from './router'
import store from './store'

// global component
import AppButton from './components/AppButton'

// registration of global components
Vue.component('AppButton', AppButton)

// to hide production mode warnings
Vue.config.productionTip = false

// main vue instance
new Vue({
  router,
  store,
  // render App.vue component
  render: h => h(App)
  // fmount from public > index.html
}).$mount('#app')
