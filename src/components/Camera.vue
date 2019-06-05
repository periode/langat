<template>
<video id="camera"></video>
</template>

<style scoped>

</style>

<script>

export default {
  data: function(){
    return {

    }
  },
  mounted() {
    console.log('hey');
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    // navigator.getUserMedia = navigator.mediaDevices.getUserMedia

    let cam = document.getElementById('camera')

    navigator.mediaDevices.getUserMedia({video: {facingMode: "environment"}})
    .then(function(stream) {
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
