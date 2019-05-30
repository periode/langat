<template>
  <div>
    <Header/>
    <main>
      <div class="popup centered" v-if="popup.length > 0">
        {{ popup }}
      </div>
      <Form v-if="showForm" @formCompleted="submitForm" :message="message" :connected="connected"/>
      <span v-else>
        <div v-if="prompt.length > 0" id="prompt" class="prompt centered">
          {{ prompt }}
        </div>
        <div id="choices" class="choices centered">
          <span v-if="beginning_choice">
            <button class="button-input" @click="submitChoice" value="0">Social</button>
            <button class="button-input" @click="submitChoice" value="1">Music</button>
            <button class="button-input" @click="submitChoice" value="2">Photography</button>
            <button class="button-input" @click="submitChoice" value="3">News</button>
          </span>
          <span v-if="button_choice">
            <button class="button-input" @click="submitChoice" value="0">{{choice_A}}</button>
            <button class="button-input" @click="submitChoice" value="1">{{choice_B}}</button>
          </span>
          <span v-if="checkbox_choice == true">

          </span>
          <span v-if="input_choice == true">
            <input class="text-input" type="text" placeholder="Enter your thoughts here..."/><br />
            <button @click="submitChoice">SUBMIT</button>
          </span>
        </div>
      </span>
      <Timer :isActive="timerReset" @timer-end="timerEnd"/>
    </main>
    <Footer/>
  </div>
</template>

<style scoped>
  main{
    height: 88vh;
  }

  .popup{
    height: 300px;
    width: 300px;
    font-size: 1.2em;
    white-space: pre-line;
    text-align: center;
  }

  .prompt{
    height: 100px;
    width: 300px;
    background-color: white;
    color: #1335B1;
    border: 3px solid #1335B1;
    top: -300px;
    text-align: center;
    line-height: 50px;
    font-size: 1.5em;
    font-weight: bold;
  }

  .choices{
    top: 400px;
    width: 300px;
    min-height: 200px;
    max-height: 400px;
  }

  .button-input{
    float: left;
    width: 100%;
    font-size: 1.5em;
    margin-top: 2%;
    margin-bottom: 2%;
    background-color: #1335B1;
    border: none;
    color: white;
    height: 50px;
  }
</style>

<script>
  import Form from './Form.vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  import Timer from './Timer.vue'

  export default {
    components: {
      Form,
      Header,
      Footer,
      Timer
    },
    data: function(){
      return {
        connected: false,
        showForm: true,
        prompt: '',
        beginning_choice: false,
        button_choice: false,
        checkbox_choice: false,
        input_choice: false,
        current_mode: '',
        choice_A: '',
        choice_B: '',
        message: '',
        popup: '',
        client: null,
        info: {
          first_name: "tPierre",
          last_name: "tDepaz",
          birthdate: "t1991-05-20",
          origin: "tFrance",
          gender: "tMale",
          marital_status: "tMarried",
          occupation: "tLehrer"
        },
        timerReset: false,
        timerVisible: false
      }
    },
    methods: {
      submitInformation: function(evt){

      },
      submitChoice: function(evt){
        console.log('choosing', evt.target.value);

        this.client.send('/control/choose', [this.current_mode, evt.target.value])
      },
      submitForm: function(evt){
        this.info = evt

        this.message = 'Processing your application, ' + evt.first_name
        console.log('[ADMIN] - Submitting new profile for ' + evt.first_name + ' ' + evt.last_name)

        let rand = '';
        while (rand.length < 5){
          rand += Math.floor(Math.random()*10) + ''
        }

        this.info.id = evt.first_name+'_'+evt.last_name+'_'+rand;
        this.client.send('/control/join', [rand, evt.first_name, evt.last_name, evt.birthdate, evt.origin, evt.gender, evt.marital_status, evt.occupation])

        this.client.send('/sys/subscribe', ['/user_'+this.info.id])
      },
      timerEnd: function(){
        this.timerReset = false
        this.resetAll()
      },
      resetAll: function(){
        this.button_choice = false
        this.beginning_choice = false
        this.prompt = ''
      }
    },
    mounted(){
      this.client = new rhizome.Client()
      window.client = this.client

      this.client.start((err) => {
        if(err)
          alert(err)

          this.client.on('connected', () => {
            console.log('[SOCK] Connected');
            this.connected = true
          })

        this.client.send('/sys/subscribe', ['/all'])

        this.client.on('message', (address, args) => {
          console.log('[MSG] received at ' + address + ' - ' + args);

          switch (address) {
            case '/all/start':
              console.log('[STATE] - start');
              this.showForm = false
              document.body.style.backgroundColor = "black"
              break;
            case '/all/next':
              console.log('[STATE] - next');

              this.current_mode = args[0]
              this.prompt = args[1]

              if(this.current_mode === "beginning"){ //-- binary choice
                this.beginning_choice = true
              }else if(this.current_mode === "binary"){
                this.button_choice = true
                this.choice_A = args[2]
                this.choice_B = args[3]
              }else if(this.current_mode === "checkboxes"){ //-- different checkboxes
                //-- essentially just send the ratio of tickboxes that remained ticked
              }else if(this.current_mode === "input"){ //-- this should be for displaying the text input
                //
              }

              this.timerReset = true //reset the timer
              this.timerVisible = true //reset the timer

              break;
            case '/all/choose':
              console.log('[STATE] - choose');
              //this is where we actually display the choices that have been preloaded
              break;
            case '/user_'+this.info.id:
              if(args[0] == 'confirmed'){
                this.showForm = false
                this.popup = "Network successfully joined.\n\nCongratulations!\n\nTo maintain the best connection, please avoid refreshing the page.\n\nThe show will start soon."
              }
              break;
            default:
              console.log('[ERROR] received addr: ' + address + ' with args '+ args);
          }
        })


      })

    }
  }
</script>
