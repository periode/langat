<template>
  <div>
    <Header/>
    <main>
      <div class="controls">
        <div class="category">CONTROLS</div>
        <div class="subcontrols legend">
          <button @click="sendStart" class="start">START</button> <button @click="sendKaraoke">KARAOKE</button> <button @click="sendCamera">CAMERA</button> <button class="end" @click="sendStop">STOP</button> <button class="end" @click="sendReset">RESET</button> <button class="end" @click="sendEnd">END</button>
        </div>
        <hr />
        <div class="subcontrols">
          <span class="legend-static">scenes</span>
          <select id="scene-list" name="scene" v-model="next">
            <option v-for="scene in scenes" :value="scene.id">
              {{scene.id}}
            </option>
          </select>
          <button @click="jumpToScene">jump</button>
        </div>
        <div class="subcontrols">
          <div class="legend">
            <span class="legend-static">{{ current.id }}</span>  <span v-for="choice in current.choices" class="following-choice">{{choice.toLowerCase()}} </span> <button v-if="armed" @click="sendNext">SEND</button>
          </div>
        </div>
        <hr />
        <div class="subcontrols">
          <span class="legend-static">text inputs</span><button class="button-unfold" @click="showTextInput=!showTextInput">{{showTextInput ? '-' : '+'}}</button>
          <div v-if="showTextInput">
            <br />
            <span class="legend">
              <input type="text" v-model="highlighted_user" placeholder="highlight user"/><button @click="sendHighlight(highlighted_user, 'red')">HIGHLIGHT</button>
            </span>
            <span class="legend">
              <input type="text" v-model="text_input" placeholder="added chat text input"/><button @click="sendTextInput">SEND TEXT</button>
            </span>
            <div v-for="input in inputs">{{input.text}} by {{input.user}}</div>
          </div>
        </div>
        <div class="subcontrols">
          <span class="legend-static">media display</span><button class="button-unfold" @click="showMediaDisplay=!showMediaDisplay">{{showMediaDisplay ? '-' : '+'}}</button>
          <div v-if="showMediaDisplay" class="legend">
            <br />
            <button class="legend" @click="sendMedia('wolf_pack')">WOLF PACK SELFIE</button>
            <button class="legend" @click="sendMedia('red_hood')">RED HOOD SELFIE</button>
            <button class="legend" @click="sendMedia('burning_soul')">SOUL PILL VIDEO</button>
            <button class="legend" @click="sendMedia('shadow')">SHADOW VIDEO</button>
            <button class="legend" @click="sendMedia('off')">OFF</button>
          </div>
        </div>
        <div class="subcontrols">
          <span class="legend-static">cues</span><button class="button-unfold" @click="showCues=!showCues">{{showCues ? '-' : '+'}}</button>
          <div v-if="showCues" class="legend">
            <br />
            <button @click="sendCue">CUE</button>
          </div>
        </div>
        <hr />
        <div class="subcontrols legend">
          <input type="text" id="address"/><button @click="sendMsg">SEND</button>
        </div>

      </div>
      <!-- LEFT -->
      <!-- LEFT -->
      <!-- LEFT -->
      <div class="info">
        <div class="category">STATUS</div>
        <div :class="connected ? 'start single-info' : 'end single-info'">
          Status: {{ connected ? "Connected" : "Disconnected" }}
        </div>
        <div class="single-info">
          Current users: {{ users.length }}
        </div class="single-info">
        <div class="single-info">Current scene: {{ current.id }}</div>
        <div class="single-info">Current vote:<br />
          <div v-for="choice in choices">
            {{choice.name}} - {{choice.votes}}
          </div>
        </div>
        <div class="category">LOGS</div>
        <div class="logs">
          <li v-for="log in logs">
            {{ log }}
          </li>
        </div>
      </div>
    </main>
    <!-- <Footer :status="status"/> -->
  </div>
</template>
<style scoped>

main{
  height: 100vh;
  background-color:  #101420;
  color: #dbdbdb;
  font-size: 0.8em;
}

button{
  border: 2px solid #dbdbdb;
  background-color: white;
  color:  #0C59AA;
  padding: 5px;
  margin: 5px;
  width: auto;
}

input{
  border: none;
  background-color: #0C59AA;
  border-bottom: 1px solid #dbdbdb;
  margin-right: 5px;
}

.category, .following-choice{
  font-size: 1.5em;
  font-weight: bold;
  margin: 10px;
}

.category::before, .following-choice::before{
  content: "⇝";
  font-size: 1.5em;
}

.controls{
  width: 65%;
  float: left;
  padding-top: 10px;
  padding-left: 5px;
}

.subcontrols{
  float: left;
  width: 100%;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 2px solid #dbdbdb;
}

.button-unfold{
  float: right;
  font-size: 1em;
  background-color: #dbdbdb;
  color:  #0C59AA
}

.legend{
  width: 100%;
  float: left;
  font-size: 1.0em;
  padding: 2px;
}

.legend-static{
  background-color: white;
  color: #0C59AA;
  padding: 2px;
  font-size: 1.5em;
  font-size: bold;
}

.legend button{
  font-style: italic;
  border: none;
  font-weight: bold;
}

.start, .end{
  color: white;
}

.start{
  background-color: green;
  float: left;
}

.end{
  background-color: darkred;
  float: right;
}

.info{
  width: 30%;
  float: right;
  font-size: 1em;
  list-style: disclosure-closed;
  padding-top: 10px;
  padding-right: 10px;
}

.single-info{
  float: left;
  width: 100%;
}

.logs{
  overflow-y: scroll;
  height: 50vh;
  position: relative;

  border-top: 2px solid #dbdbdb;
  margin-top: 10px;
  padding-top: 10px;
  list-style: disclosure-closed;
}

</style>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

const scenes = require('../data/scenes.js')

class User{
  constructor(_id, _fn, _ln, _bd, _or, _ge, _ms, _oc){
    this.id = _fn + '_' + _ln + '_' + _id
    this.first_name = _fn
    this.last_name = _ln
    this.birthdate = _bd
    this.origin = _or
    this.gender = _ge
    this.marital_status = _ms
    this.occupation = _oc
  }
}

  export default {
    components:{
      Header,
      Footer
    },
    data: function(){
      return {
        connected: false,
        status: '',
        users: [],
        logs: [],
        current: {},
        next: {},
        scenes: [],
        armed: false,
        showTextInput: false,
        text_input: '',
        showMediaDisplay: false,
        showCues: '',
        next_message: [],
        current_scene: 'None',
        inputs: [],
        consents: 0,
        highlighted_user: '',
        showMediaDisplay: false,
        choices: [
          {
            name: "0",
            votes: 0
          },
          {
            name: "1",
            votes: 0
          },
          {
            name: "2",
            votes: 0
          },
          {
            name: "3",
            votes: 0
          }
        ],
        client: null,
        oscClient: null
      }
    },
    methods: {
      sendMsg: function(evt){
        console.log(evt);
      },
      sendCue: function(evt){
        this.oscClient.send({address:'/go'})
        this.logs.unshift("[SENDING] - Cue")
      },
      sendStart: function(evt){
        this.armed = true
        this.client.send('/all/start', ['go'])
        this.armNext(this.current.id)
        this.logs.unshift("[SENDING] - Start")
      },
      sendStop: function(evt){
        this.logs.unshift('[CONTROL] STOP')
        this.client.send('/all/stop')
      },
      jumpToScene: function(){
        let sc = document.getElementById("scene-list").value
        this.logs.unshift("[SCENE] jumping to " + sc)
        this.armNext(sc)
      },
      sendKaraoke: function(){
        this.client.send('/all/karaoke')
        this.client.send('/stage/karaoke')
        this.logs.unshift("[SENDING] - Karaoke")
      },
      sendCamera: function(){
        this.client.send('/all/camera')
        this.logs.unshift("[SENDING] - Camera")
      },
      sendEnd: function(){
        console.log('sending end');
        this.client.send('/all/end')
        this.logs.unshift("[SENDING] - End")
      },
      sendReset: function(){
        this.logs = []
        this.logs.push("--- [RESET] --- [RESET] --- [RESET] ----")
        this.current = scenes[0]

      },
      sendHighlight: function(user, color){
        console.log('sending highlight',user,color);
        if(user == 'all')
          client.send('/all/color', [color])
        else
          client.send('/user_'+user+'/color', [color])
      },
      sendTextInput: function(){
        console.log('sending', this.text_input);
        client.send('/all/textinput', [this.text_input])
      },
      armNext: function(data){
        for(let scene of scenes){
          if(scene.id === data){
            this.current = scene
            this.logs.unshift("[SCENE] - Arming next scene: " + scene.id)
            this.armed = true
            this.next_message = [scene.choice_type, scene.prompt, ...scene.choices]

            //-- letting the actors know what is going to happen
            client.send('/stage/next', [this.current.id, this.current.content.length, ...this.current.content, ...this.current.following])
            client.send('/all/current', [this.current.id])
          }
        }
      },
      sendNext: function(evt){
        this.logs.unshift("[SCENE] - Sending "+this.next_message.join(" | "))
        this.client.send('/all/next', this.next_message)

        //-- highlighting the actors
        this.client.send('/stage/color', ['white'])
        setTimeout(this.evaluateResults, 17000)
      },
      sendMedia: function(data){
        this.logs.unshift("[MEDIA] - Sending " + data)
        this.client.send('/all/media', [data])
      },
      evaluateResults: function(evt){
        if(this.current.choice_type == "checkboxes"){
          //max checkboxes = users * 4
          let results = (this.consents / (this.users.length * this.current.choices.length)) * 100
          this.logs.unshift('[CONSENT] - ' + results + '% of consents');
          if(results > 50) //if users have overall left 50% of the consents checked
            this.armNext(this.current.following[0])
          else
            this.armNext(this.current.following[1])
        }else{
          // TODO: MAKE THIS RANDOM FOR TIE

          let highest_value = -100
          let highest_index = null
          for(let index in this.choices){
            if(this.choices[index].votes > highest_value){
              highest_value = this.choices[index].votes
              highest_index = index
            }
          }

          this.logs.unshift('[RESULT] The highest index is ' + highest_index + ' with ' + highest_value + ' votes.');
          this.logs.unshift('[NEXT] The next scene is: ' + this.current.following[highest_index])
          this.armNext(this.current.following[highest_index])

          for(let choice of this.choices)
            choice.votes = 0
        }
      },
      findScene: function(_next){
        for(let scene of scenes){
          if(scene.id == _next){
            return scene
          }
        }
      }
    },
    mounted(){
      this.client = new rhizome.Client()
      this.scenes = scenes

      this.client.start((err) => {
        if(err)
          alert(err)

          this.client.on('connected', () => {
            console.log('[SOCK] Connected');
            this.logs.unshift('[SOCK] - connected')
            this.connected = true
            this.status = "Connected"
          })

          this.client.on('connection lost', function() {
            console.log('[SOCK] Disconnected');
            this.connected = false
            this.status = "Disconnected"
          })

          this.client.on('server full', function() {
            this.connected = false
            this.status = "Reconnecting..."
          })

        this.users.push({"fake":"fake"})

        this.client.send('/sys/subscribe', ['/control'])

        this.client.on('message', (address, args) => {
          switch (address) {
            case '/control/join':
              let user = new User(...args)
              this.users.push(user)

              this.logs.unshift('[ADMIN] - got a new user: ' + user.first_name)

              this.client.send('/user_'+user.id, ['confirmed'])
              break;
            case '/control/choose':
              if(args[0] === "binary"){
                this.choices[0].votes += args[1] == '0' ? 1 : 0
                this.choices[1].votes += args[1] == '1' ? 1 : 0
              }else if(args[0] === "beginning"){
                this.choices[0].votes += args[1] == '0' ? 1 : 0
                this.choices[1].votes += args[1] == '1' ? 1 : 0
                this.choices[2].votes += args[1] == '2' ? 1 : 0
                this.choices[3].votes += args[1] == '3' ? 1 : 0
              }else if(args[0] === "single"){

              }else if(args[0] === "input"){
                this.logs.unshift("[MSG] received input: " + args[1] + "from " + args[2])
                this.inputs.push({user: args[2], text: args[1]})
              }else if(args[0] === "checkboxes"){
                this.logs.unshift("[MSG] received checkboxes: " + args[1])
                this.consents += parseInt(args[1])
              }else{
                console.log("[WARN] - got different choice type: "+args[0])
              }
              break;
            default:
              console.log("[WARN] - received address: " + address + " - " + args)
          }
        })

        //-- the rest of the socket code goes here
      })

      this.current = scenes[0]

      window.client = this.client

      this.oscClient = new osc.WebSocketPort({
        url: 'ws://localhost:53001',
        metadata: true
      })

      this.oscClient.open()
    }
  }
</script>
