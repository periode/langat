<template>
  <div>
    <Header/>
    <main>
      <Chat :showChat="showChat" :showChatContent="showChatContent" :additionalChatContents="additionalChatContents" id="chat" @chat-over="onChatOver"/>

      <img v-if="image_src.length > 0" class="media-holder centered" :src="image_src" />
      <video v-if="video_src.length" class="media-holder centered" :src="video_src" muted></video>

      <div class="popup centered" v-if="popup.length > 0">
        <div class="popup-inner">
          {{ popup }}
        </div>
      </div>
      <Form v-if="showForm" @formCompleted="submitForm" :message="message" :connected="connected"/>
      <span v-else>
        <div v-if="prompt.length > 0" id="prompt" class="prompt centered">
          <div class="prompt-inner">
            {{ prompt }}
          </div>
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
          <span v-if="checkbox_choice">

          </span>
          <span v-if="input_choice">
            <input class="text-input" id="text-input" type="text" placeholder="Enter your thoughts here..."/><br />
            <button class="button-input" @click="submitChoice">SUBMIT</button>
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

  .media-holder{
    z-index: 4;
  }

  .popup{
    min-height: 300px;
    width: 300px;

    z-index: 2;
  }

  .image-holder{
    z-index: 3;
  }

  .popup-inner{
    font-size: 1.2em;
    white-space: pre-line;
    text-align: center;
    color: #1335B1;
    border: 3px solid #1335B1;
    background-color: white;
    max-height: 100%;
    padding: 10px;
  }

  .prompt-inner{
    max-height: 100%;
    white-space: pre-line;
  }

  .prompt{
    height: 200px;
    width: 300px;
    background-color: white;
    color: #1335B1;
    border: 3px solid #1335B1;
    top: -300px;
    text-align: center;
    line-height: 50px;
    font-size: 1.5em;
    font-weight: bold;

    z-index: 2;
  }

  .choices{
    top: 300px;
    width: 300px;
    min-height: 200px;
    max-height: 400px;

    z-index: 2;
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

    z-index: 2;
  }

  .text-input{
    font-size: 1.5em;
    margin-bottom: 25px;

    z-index: 2;
  }
</style>

<script>
  import Form from './Form.vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  import Timer from './Timer.vue'
  import Chat from './Chat.vue'

  export default {
    components: {
      Form,
      Header,
      Footer,
      Timer,
      Chat
    },
    data: function(){
      return {
        connected: false,
        showForm: false,
        prompt: '',
        chat_prompt: '',
        beginning_choice: false,
        button_choice: false,
        checkbox_choice: false,
        input_choice: false,
        current_mode: '',
        choice_A: '',
        choice_B: '',
        showChat: false,
        showChatContent: true,
        additionalChatContents: '',
        message: '',
        popup: '',
        image_src: '',
        video_src: '',
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
        timerReset: false
      }
    },
    methods: {
      submitInformation: function(evt){

      },
      submitChoice: function(evt){
        let val = []
        switch (this.current_mode) {
          case 'input':
            val.push(document.getElementById('text-input').value)
            if(this.info.id != undefined)
              val.push(this.info.id)
            else
              val.push('Pierre_Depaz_666')
            break;
          case 'checkboxes':
            // TODO:
            break;
          default: //-- 'single' and 'binary'
            val = [evt.target.value]

        }
        console.log('choosing:', val);

        this.displayFeedback()

        this.client.send('/control/choose', [this.current_mode, ...val])
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
        this.showChatContent = true
        this.prompt = ''

      },
      displayFeedback: function(){
        this.beginning_choice = false
        this.button_choice = false
        this.input_choice = false
        this.prompt = "Thank you for your contribution ;)"
        setTimeout(() => { this.prompt = ''}, 4000)
      },
      onChatOver: function(){
        this.showChatContent = false
        this.input_choice = true
        this.timerReset = true
        this.prompt = this.chat_prompt
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
              this.popup = ''
              document.body.style.backgroundColor = "black"
              break;
            case '/all/next':
              console.log('[STATE] - next');

              this.current_mode = args[0]
              this.showChat = false

              if(this.current_mode === "beginning"){ //-- binary choice
                this.timerReset = true //reset the timer
                this.prompt = args[1]
                this.beginning_choice = true
              }else if(this.current_mode === "binary"){
                this.timerReset = true //reset the timer
                this.prompt = args[1]
                this.button_choice = true
                this.choice_A = args[2]
                this.choice_B = args[3]
              }else if(this.current_mode === "checkboxes"){ //-- different checkboxes
                //-- essentially just send the ratio of tickboxes that remained ticked
                this.timerReset = true //reset the timer
                this.prompt = args[1]
                this.checkbox_choice = true
              }else if(this.current_mode === "input"){ //-- this should be for displaying the text input
                this.showChat = true
                this.chat_prompt = args[1]
                // this.input_choice = true
              }else if(this.current_mode === "camera"){

              }
              //// TODO: longer duration for text input section?

              break;
            case '/all/choose': // TODO: OBSOLOETE??????????????
              console.log('[STATE] - choose');
              //this is where we actually display the choices that have been preloaded
              break;
            case '/all/textinput': // TODO: OBSOLOETE??????????????
              console.log('[INPUT] - received',args[0]);
              this.additionalChatContents = args[0]
              break;
            case '/all/media':
              console.log('[MEDIA] - Displaying ' + args[0]);
              // let video = document.getElementsByTagName("video")[0]
              // video.setAttribute('autoplay', '')
              // video.setAttribute('muted', '')
              // video.setAttribute('playsinline', '')
              // video.play()
              // this.video_src = 'media/test.mp4'
              break;
            case '/user_'+this.info.id:
              if(args[0] == 'confirmed'){
                this.showForm = false
                this.popup = "Network successfully joined.\n\nCongratulations!\n\nTo maintain the best connection, please avoid refreshing the page.\n\nThe show will start soon."
              }
              break;
            case '/user_'+this.info.id+'/color':
              document.body.style.backgroundColor = args[0]
              break;
            default:
              console.log('[ERROR] received addr: ' + address + ' with args '+ args);
          }
        })


      })

    }
  }
</script>
