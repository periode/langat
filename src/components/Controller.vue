<template>
  <div>
    <Header/>
    <main>
      <div class="controls">
        <input type="text" id="address"/><button @click="sendMsg">send</button><br />
        <button @click="sendStart">start</button>
      </div>
      <div class="info">
        <div>
          Current users: {{ users.length }}
        </div>
        <div>Current scene: {{ current_scene }}</div>
        <div>Current vote:  choice A: {{ choices_A.length }} / choice B: {{ choices_B.length }}</div>
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
.controls{
  width: 70%;
  float: left;
  padding-top: 10px;
  padding-left: 5px;
}

.info{
  width: 30%;
  float: right;
  font-size: 0.8em;
  list-style: disclosure-closed;
  padding-top: 10px;
  padding-right: 5px;
}

.logs{
  border-top: 2px solid black;
  margin-top: 10px;
  padding-top: 10px;
  list-style: disclosure-closed;
}

</style>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

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
        users: [],
        logs: [],
        current_scene: 'None',
        choices_A: [],
        choices_B: [],
        client: null
      }
    },
    methods: {
      sendMsg: function(evt){
        console.log(evt);
      },
      sendStart: function(evt){

      }
    },
    mounted(){
      this.client = new rhizome.Client()

      this.client.start((err) => {
        if(err)
          alert(err)

        this.client.on('connected', () => {
          this.logs.push('[SOCK] - connected')
        })

        this.client.send('/sys/subscribe', ['/control'])

        this.client.on('message', (address, args) => {
          if(address === '/control/join'){
            let user = new User(...args)
            this.users.push(user)

            this.logs.push('[ADMIN] - got a new user: ' + user.first_name)

            this.client.send('/user_'+user.id, ['confirmed'])
          }
        })

        //-- the rest of the socket code goes here
      })

      window.client = this.client
    }
  }
</script>
