<template>
  <div id="window">
    <Header/>
    <main id="background">
      <div class="scene-title">
        <span>{{current}}</span>
      </div>
      <hr />
      <div class="scene-content">
        <div v-for="content in contents">
          {{content}}
        </div>
      </div>
      <hr />
      <div class="next-title">
        <span>NEXT</span>
        <div class="single-next" v-for="one in following">{{one}}</div>
      </div>
    </main>
    <Footer :connected="connected"/>
  </div>
</template>
<style scoped>




main{
  background-color: black;
  transition: all 2s linear;
  height: 100vh;
  color: white;
  padding: 5%;
}

hr{
  margin-top: 5%;
  margin-bottom: 5%;
}

.scene-title{
  width: 90%;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
}

.next-title{
  width: 90%;
  font-size: 1.5em;
  text-align: center;
}

.next-title span{
  font-size: 1.5em;
  font-weight: bold;
}

.single-next{
  margin: 1%;
}

.scene-content{
  font-size: 1em;
  margin: 1%;
}

@media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : portrait){
  main{
    font-size: 2em;
    position: absolute;
    top: 100px;
    width: 90%;
  }

  .scene-content{
    font-size: 1.5em;
    text-align: center;
  }
}

</style>
<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  data: function(){
    return {
      connected: false,
      client: null,
      updater: '',
      current: 'WAITING',
      contents: [],
      following: [],
      background: null,
      showKaraoke: false,
      showCleverMonologue_1: false,
      showCleverMonologue_2: false
    }
  },
  mounted(){
    this.background = document.getElementById('background')

    this.client = new rhizome.Client()
    window.client = this.client

    this.client.start((err) => {
      if(err)
        alert(err)
    })

    this.client.on('connected', () => {
      console.log('[SOCK] Connected');
      this.connected = true
      this.client.send('/sys/subscribe', ['/stage'])

      document.getElementById("window").onclick = () => {
        if(this.client._socket.readyState == 1)
          this.client.send('/control/update')
      }
    })

    this.updater = setInterval(() => {
      console.log('sending update intervale'+this.client);
      if(this.client._socket.readyState == 1)
        this.client.send('/control/update')
    }, 1000)

    this.client.on('connection lost', function() {
      console.log('[SOCK] Disconnected');
      clearInterval(this.updater)
      this.connected = false
      this.status = "Disconnected"
    })

    this.client.on('message', (address, args) => {
      console.log('[MSG] received at ' + address + ' - ' + args);

      this.showCleverMonologue_1 = false
      this.showCleverMonologue_2 = false

      switch (address) {
        case '/stage/latest':
          if(this.current === args[0] && this.updater){
            clearInterval(this.updater)
          }else{
            this.current = args[0]
            if(this.current === "Karaoke")
              this.showKaraoke = true
            let length = args[1]
            this.contents = args.slice(2, 2 + length)
            this.following = args.slice(2 + length, args.length)
          }
          break;
        case '/stage/next':
            this.background.style.backgroundColor = 'black'
            this.background.style.color = 'white'

            this.current = args[0]
            if(this.current === "Karaoke")
              this.showKaraoke = true
            let length = args[1]
            this.contents = args.slice(2, 2 + length)
            this.following = args.slice(2 + length, args.length)
          break;
        case '/stage/color':
          this.background.style.backgroundColor = args[0]
          this.background.style.color = 'black'
          break;
        default:
          console.log('[WARN] received unsure - ' + address + ' - ' + args);
          break;
      }
    })
  }
}
</script>
