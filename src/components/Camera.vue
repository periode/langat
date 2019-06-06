<template>
<video id="camera"></video>
</template>

<style scoped>
video{
  width: 100%;
  height: 100%;
}
</style>

<script>

export default {
  data: function(){
    return {

    }
  },
  mounted() {
    console.log('Camera mounted');

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
