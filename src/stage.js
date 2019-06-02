import Vue from 'vue'
import Stage from './components/Stage.vue'

const vm = new Vue({
  el: '#app',
  template: '<Stage/>',
  components: {
    'Stage': Stage
  }
})
