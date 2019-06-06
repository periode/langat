<template>
<div class="karaoke-holder centered" v-if="showKaraoke">
  <div class="karaoke-title">
    UKKOMETSU
  </div>
  <div class="karaoke-lyrics">
Katto kallellaan siinä kuusen alla
Seisoo vielä mökki paikallaan
Kun ostokeskuksen
Ohi kuljen tiedän sen
Kohta tullut oon Ukkometsoon
Hei tarjoillija tuokaa mulle kolpakko
Yhtä kylmä niin niin kuin aina ennenkin
Mull' on kova jano taas ja paksu lompakko
En tuhaan tullut oo Ukkometsoon

<i>kertosäe</i>
Suomenniemellä, suomen kielellä
Äijat huutaa lailla Perkeleen
Ja kun Suomi pelaa lätkää
Se iskee joka jätkään
Kaljaa koneeseen ja Ukkometsoon

No, Ukkometson Liisaa
Me katsellaan, kun viinaa
Juodaan ja me tullaan humalaan
Liisalla on povi
Kuin kuninkaitten hovi
Sen edessä on pakko k**artaa

On Ukkometson ilta
Ja kohta kamarilta
Meitä tullaan pois jo hakemaan
Me eletään vain kerran
Ei meitä pelko Herran
Saa jumalauta hiljaa juhlimaan

<i>kertosäe</i>
No, Reiska laittaa soimaan vielä yhden laulun
Ja itkee sitten yhden kyyneleen
Se laulu kertoo meistä
Onnen enkeleistä
Jotka pohjantähden alla asustaa

On Ukkometson ilta
Ja kohta kamarilta
Meitä tullaan pois jo hakemaan
Me eletään vain kerran
Ei meitä pelko Herran
Saa jumalauta hiljaa juhlimaan

<i>kertosäe x2</i>
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

@media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : portrait) {
  .karaoke-lyrics{
    font-size: 2.5em;
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
    showKaraoke: Boolean
  }
}
</script>
