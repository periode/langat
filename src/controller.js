require('./style/main.scss')

import Vue from 'vue'
import Controller from './components/Controller.vue'

const vm = new Vue({
  el: '#app',
  template: '<Controller/>',
  components: {
    'Controller': Controller
  }
})
