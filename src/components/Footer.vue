<template>
  <footer>
    <span class="left">{{ status }}</span>
    <span class="right">© 2021</span>
  </footer>
</template>
<style scoped>
footer{
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
@media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : portrait)
{
  footer{
    font-size: 3em;

  }
}

</style>
<script>
  export default {
    data: function(){
      return {

      }
    },
    props: {
      status: {
        type: String
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
