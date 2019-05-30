<template>
  <div>
    <Header/>
    <main>
      <div class="controls">
        <div class="subcontrols">
          <input type="text" id="address"/><button @click="sendMsg">SEND</button>
        </div>
        <div class="subcontrols">
          <button @click="sendStart">START</button>
        </div>
        <div class="subcontrols">
          <div class="legend">
            ARMED NEXT: {{ current.id }}
          </div>
          <div class="legend">
            CHOICES NEXT:<br />
            <span v-for="choice in current.choices">- {{choice}}</span>
          </div>

        </div>
        <div class="subcontrols" v-if="armed">
          <div class="legend">
            SEND NEXT CHOICE
          </div>
          <button @click="sendNext">SEND</button>
        </div>
      </div>
      <div class="info">
        <div>
          Status: {{ isConnected ? "Connected" : "Disconnected" }}
        </div>
        <div>
          Current users: {{ users.length }}
        </div>
        <div>Current scene: {{ current.id }}</div>
        <div>Current vote:<br />
          <div v-for="choice in choices">
            {{choice.name}} - {{choice.votes}}
          </div>
        </div>
        <div class="logs">
          <li v-for="log in logs.reverse()">
            {{ log }}
          </li>
        </div>
      </div>
    </main>
    <Footer/>
  </div>
</template>
<style scoped>

main{
  height: 100vh;
  background-color: #09090e;
  color: #dbdbdb;
}

button{
  border: 2px solid #dbdbdb;
  background-color: #101420;
  padding: 5px;
  width: auto;
}

input{
  border: none;
  background-color: #0C59AA;
  border-bottom: 1px solid #dbdbdb;
  margin-right: 5px;
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

.legend{
  width: 100%;
  float: left;
  font-size: 1.5em;
}

.info{
  width: 30%;
  float: right;
  font-size: 0.8em;
  list-style: disclosure-closed;
  padding-top: 10px;
  padding-right: 10px;
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
const scenes = require('../scenes.js')

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
        isConnected: false,
        users: [],
        logs: [],
        current: {},
        armed: false,
        next_message: [],
        current_scene: 'None',
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
        client: null
      }
    },
    methods: {
      sendMsg: function(evt){
        console.log(evt);
      },
      sendStart: function(evt){
        this.armed = true
        this.client.send('/all/start', ['go'])
        this.armNext(this.current.id)
        evt.target.disabled = true
      },
      armNext: function(data){
        for(let scene of scenes){
          if(scene.id === data){
            this.current = scene
            this.logs.push("[SCENE] - Arming next scene: " + scene.id)
            this.armed = true
            this.next_message = [scene.choice_type, scene.prompt, ...scene.choices]
          }
        }
      },
      sendNext: function(evt){
        this.logs.push("[SCENE] - Sending "+this.next_message.join(" | "))
        this.client.send('/all/next', this.next_message)
        setTimeout(this.evaluateResults, 17000)
      },
      evaluateResults: function(evt){

        // TODO: MAKE THIS RANDOM FOR TIE

        let highest_value = -100
        let highest_index = null
        for(let index in this.choices){
          if(this.choices[index].votes > highest_value){
            highest_value = this.choices[index].votes
            highest_index = index
          }
        }

        this.logs.push('[RESULT] The highest index is ' + highest_index + ' with ' + highest_value + ' votes.');
        this.logs.push('[NEXT] The next scene is: ' + this.current.following[highest_index])
        this.current_scene = this.armNext(this.current.following[highest_index])

        for(let choice of this.choices)
          choice.votes = 0

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

      this.client.start((err) => {
        if(err)
          alert(err)

        this.isConnected = true

        this.client.on('connected', () => {
          this.logs.push('[SOCK] - connected')
        })

        this.client.send('/sys/subscribe', ['/control'])

        this.client.on('message', (address, args) => {
          switch (address) {
            case '/control/join':
              let user = new User(...args)
              this.users.push(user)

              this.logs.push('[ADMIN] - got a new user: ' + user.first_name)

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

              }else{
                console.log("[CHOICE] - got choice type: "+args[0])
              }
              break;
            default:
              console.log("[WARN] - received address: "+address+" - "+args)
          }
        })

        //-- the rest of the socket code goes here
      })

      this.current = scenes[0]

      window.client = this.client
    }
  }
</script>
