<template>
  <span>
    <div class="flash-effect">

    </div>
    <video id="camera">
    </video>
    <div class="camera-button" @click="flash">
      <div class="camera-button-inner" @click="flash">

      </div>
    </div>
  </span>
</template>

<style scoped>
span{
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 5;
}
video{
  width: 100%;
  height: 100%;
}

.flash-effect{
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: white;
  opacity: 0;

  transition: opacity 0.1s linear;
}

.camera-button{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 13vh;
  margin: auto;
  height: 10vh;
  width: 10vh;
  border-radius: 5vh;
  border: 3px solid white;
}

.camera-button-inner{
  border-radius: 5vh;
  border: 5px solid darkred;
  background-color: red;
  height: 85%;
  width: 85%;
  position: absolute;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
</style>

<script>

export default {
  data: function(){
    return {

    }
  },
  methods: {
    flash: function(){
      console.log('flashing');
      document.getElementsByClassName("flash-effect")[0].style.opacity = 1
      setTimeout(() => {
        document.getElementsByClassName("flash-effect")[0].style.opacity = 0
      }, 100)
    }
  },
  mounted() {
    let cam = document.getElementById('camera')

    var constraints = { audio: false, video: { width: 640, height: 360 } };

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
      console.log('got media devices, and stream obj: '+stream);
      if(stream == undefined)
        return

      cam.srcObject = stream;
      cam.onloadedmetadata = function(e) {
        cam.play();
      };
    })
    .catch(function(err) {
      console.log(err);
      /* handle the error */
    });
  }
}
</script>
