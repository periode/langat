<template>
<div class="karaoke-holder centered" v-if="showKaraoke">
  <div class="karaoke-title">
    🎶MEMORY🎶
  </div>
  <div class="karaoke-lyrics">
I’ve memorized all the fish in the sea
I’ve memorized each opportunity strangled
and
I remember awakening one morning
and finding everything smeared with the color of
forgotten love
and I’ve memorized
that too.



I’ve memorized green rooms in
St. Louis and New Orleans
where I wept because I knew that by myself I
could not overcome
the terror of them and it.



I’ve memorized all the unfaithful years
(and the faithful ones too)
I’ve memorized each cigarette that I’ve rolled.
I’ve memorized Beethoven and New York City
I’ve memorized
riding up escalators, I’ve memorized
Chicago and cottage cheese, and the mouths of
some of the ladies and the legs of
some of the ladies
I’ve known
and the way the rain came down hard.
I’ve memorized the face of my father in his coffin,
I’ve memorized all the cars I have driven
and each of their sad deaths,
I’ve memorized each jail cell,
the face of each new president
and the faces of some of the assassins;
I’ve even memorized the arguments I’ve had with
some of the women
I’ve loved.



best of all
I’ve memorized tonight and now and the way the
light falls across my fingers,
specks and smears on the wall,
shades down behind orange curtains;
I light a rolled cigarette and then laugh a little,
yes, I’ve memorized it all.



the courage of my memory.
  </div>
</div>
</template>
<style scoped>
.karaoke-holder{
  width: 90%;
  height: 80%;
  background-color: white;
  border: 2px solid #1335B1;
  background-color: #1335B1;
  color: white;
  white-space: pre-line;
  overflow: scroll;
}

.karaoke-title{
  white-space: normal;
  text-align: center;
  font-size: 1.6em;
  background-color: white;
  color: #1335B1;
  padding: 2%;
}

.karaoke-lyrics{
  padding: 3%;
}
</style>
<script>
export default {
  data: function(){
    return {

    }
  },
  props: {
    showKaraoke: Boolean
  }
}
</script>
