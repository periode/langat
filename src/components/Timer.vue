<template>
  <div>
    <div id="timer" class="timer">

    </div>
  </div>
</template>
<style scoped>
.timer{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0;

  z-index: -3;

  background-color: white;
  transition: height 15s linear, opacity 0.2s linear;
}
</style>
<script>

export default {
  data: function(){
    return {
      timer: null,
      timerEl: null
    }
  },
  props: {
    isActive: Boolean
  },
  watch: {
    isActive: function(newVal, oldVal){
      if(newVal){
        this.timerEl.style.opacity = '1'
        this.timerEl.style.height = "0"

        setTimeout(() => {this.$emit('timer-end');}, 15000)
      }else{
        this.timerEl.style.opacity = '0'
        this.timerEl.style.height = "100vh"
      }
    }
  },
  methods: {
    resetTimer: function(){

    }
  },
  mounted(){
    this.timerEl = document.getElementById("timer")
  }
}
</script>
