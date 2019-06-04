<template>
  <header>
    <span class="title">THREADS</span>
    <span class="tagline">say something ⇝⇝<br />⇝⇝ see something</span>
  </header>
</template>
<style scoped>
 header{
   background-color: #1335B1;
   font-family: 'Public Sans', sans-sans-serif;
   font-style: italic;
   color: white;
   position: absolute;
   width: 96%;
   height: 50px;
   text-align: center;
   font-size: 1em;

   padding-left: 2%;
   padding-right: 2%;
 }

 .title, .tagline{
   width: 50%;
   bottom: 0px;
 }

 .title{
   float: left;
   font-size: 2em;
   text-align: left;
 }

 .tagline{
   float: right;
   font-size: 0.7em;
   height: 100%;
   text-align: right;
   line-height: 20px;
 }


 @media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : portrait) {
   header{
     font-size: 2em;
     height: 100px;
   }

   .tagline{
     font-size: 1em;
     line-height: 50px;
   }
 }
</style>

<script>
  export default {
    data: function(){
      return {

      }
    }
  }
</script>
