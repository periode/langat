<template>
  <footer>
    <span class="left">THREADS</span>
    <span class="right">© 2021</span>
  </footer>
</template>
<style scoped>
footer{
  font-family: 'Public Sans', sans-sans-serif;
  background-color: #1335B1;
  color: white;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 96%;

  padding-left: 2%;
  padding-right: 2%;
  padding-top: 2%;
  padding-bottom: 1%;
}

.left, .right{
  width: 50%;
}

.left{
  float: left;
  text-align: left;
}

.right{
  float: right;
  text-align: right;
}
</style>
<script>
  export default {
    data: function(){
      return {

      }
    },
    methods: {
      submitChoice: function(evt){
        console.log(evt);
      }
    },
    mounted(){

    }
  }
</script>
