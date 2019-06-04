<template>
  <div>
    <div id="timer_holder" class="timer_holder">
      <div id="timer" class="timer">

      </div>
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
  opacity: 1;

  z-index: -3;

  background-color: white;
}

.timer_holder{
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.2s linear;
  height: 100vh;
  width: 100%;

  z-index: -3;
}

.down{
  animation-duration: 15s;
  animation-name: go_down;
}

.down-slow{
  animation-duration: 45s;
  animation-name: go_down;
}

.up{
  animation-duration: 1s;
  animation-name: go_up;
}

@keyframes go_down {
  from {
    height: 100vh;
  }

  to {
    height: 0;
  }
}

@keyframes go_up {
  from {
    height: 0;
  }

  to {
    height: 100vh;
  }
}
</style>
<script>

export default {
  data: function(){
    return {
      timerHolder: null,
      timerEl: null
    }
  },
  props: {
    isActive: Boolean,
    isTextInput: Boolean
  },
  watch: {
    isActive: function(newIsActive){
      if(newIsActive){
        this.timerHolder.style.display = 'block'
        setTimeout(() => {
          this.timerHolder.style.opacity = '1'

          if(this.isTextInput){
            this.timerEl.className = 'timer down-slow'
            setTimeout(() => {this.$emit('timer-end');}, 45000)
          }else{
            this.timerEl.className = 'timer down'
            setTimeout(() => {this.$emit('timer-end');}, 15000)
          }
        }, 50)
      }else{
        this.timerHolder.style.opacity = '0'
        this.timerHolder.style.display = 'none'

        setTimeout(() => {this.timerEl.className = 'timer up'}, 500)
      }
    }
  },
  mounted(){
    this.timerEl = document.getElementById("timer")
    this.timerHolder = document.getElementById("timer_holder")
  }
}
</script>
