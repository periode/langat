require('./style/main.scss')

import Vue from 'vue'
import App from './components/App.vue'

const vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    'App': App
  }
})
