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
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    // navigator.getUserMedia = navigator.mediaDevices.getUserMedia

    let cam = document.getElementById('camera')

    // navigator.mediaDevices.getUserMedia({video: true})
    // .then(function(stream) {
    //   cam.src = stream;
    //   cam.play();
    // })
    // .catch(function(err) {
    //   /* handle the error */
    // });
  }
}
</script>
