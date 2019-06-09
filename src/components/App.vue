<template>
  <div id="window">
    <Header/>
    <main>

      <Chat :showChat="showChat" :showChatContent="showChatContent" :additionalChatContents="additionalChatContents" id="chat" @chat-over="onChatOver"/>

      <Camera v-if="showCamera"/>

      <Karaoke :showKaraoke="showKaraoke"/>

      <img v-if="image_src.length > 0" class="media-holder centered" :src="image_src" />
      <video v-if="video_src.length > 0" class="media-holder centered" :src="video_src" autoplay muted></video>

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
            <button class="button-input all-input" @click="submitChoice" value="0">Social</button>
            <button class="button-input all-input" @click="submitChoice" value="1">Music</button>
            <button class="button-input all-input" @click="submitChoice" value="2">Photography</button>
            <button class="button-input all-input" @click="submitChoice" value="3">News</button>
          </span>
          <span v-if="button_choice">
            <button class="button-input all-input" @click="submitChoice" value="0">{{choice_A}}</button>
            <button class="button-input all-input" @click="submitChoice" value="1">{{choice_B}}</button>
          </span>
          <span v-if="single_choice">
            <button class="button-input all-input" @click="submitChoice">{{single_choice_text}}</button>
          </span>
          <span v-if="checkbox_choice">
            <div class="checkbox-input" v-for="c_choice in checkbox_choices" @click="toggleBox">
              <div class="toggle">
                <div class="toggle-inner">

                </div>
              </div>
              <div class="checkbox-text">{{ c_choice }}</div>
            </div>
            <button class="button-input all-input" @click="submitConsent">CONSENT</button>
          </span>
          <span v-if="input_choice">
            <input class="text-input all-input" id="text-input" type="text" placeholder="Enter your thoughts here..."/><br />
            <button class="button-input all-input" @click="submitChoice">SUBMIT</button>
          </span>
        </div>
      </span>
      <Timer :isActive="showTimer" :isTextInput="input_choice" @timer-end="onTimerEnd"/>
    </main>
    <Footer :status="status"/>
  </div>
</template>

<style scoped>

  @media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : portrait) {
    main{
      top: 100px;
    }
  }

  .media-holder{
    z-index: 4;
  }

  .popup{
    height: 55vh;
    width: 300px;

    z-index: 2;
  }

  .image-holder{
    z-index: 3;
  }

  .popup-inner{
    white-space: pre-line;
    text-align: center;
    color: #1335B1;
    border: 3px solid #1335B1;
    background-color: white;
    max-height: auto;
    padding: 10px;
  }

  .prompt-inner{
    max-height: 100%;
  }

  .prompt{
    top: 15vh;
    bottom: auto;
    width: 70vw;
    background-color: white;
    color: #1335B1;
    border: 3px solid #1335B1;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;

    z-index: 2;
    padding: 5vw;
  }

  .choices{
    top: 100px;
    width: 300px;
    min-height: 200px;
    max-height: 400px;

    z-index: 2;
  }

  .checkbox-input{
    background-color: white;
    width: 96%;
    color: #1335B1;
    padding: 1%;
    margin: 1%;
    margin-right: 3%;
    float: left;
    line-height: 40px;
  }

  .toggle{
    float: left;
    width: 30px;
    height: 30px;
    padding: 5px;
    background-color: white;
    border: 2px solid #1335B1;
  }

  .toggle-inner{
    background-color: #1335B1;
    width: 30px;
    height: 30px;
    transition: all 0.1s linear;
  }

  .checkbox-text{
    font-size: 1.1em;
  }

  .button-input{
    float: left;
    width: 100%;
    font-size: 1.4em;
    margin-top: 2%;
    margin-bottom: 2%;
    background-color: #1335B1;
    border: 2px solid #1335B1;
    color: white;
    height: auto;
    padding: 2%;

    z-index: 2;
  }

  .text-input{
    border: 2px solid #1335B1;
    color: #1335B1;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 1.5em;
    margin-bottom: 25px;

    z-index: 2;
  }

  .selected {
    background-color: white;
    color: #1335B1;
  }

  @media only screen and (max-device-width: 640px), only screen and (max-device-width: 667px), only screen and (max-width: 480px) and (orientation : portrait) {
    .popup{
      font-size: 3em;
      width: 80vw;
    }

    .prompt{
      font-size: 3em;
      width: 70vw;
    }

    .prompt{
      line-height: 70px;
    }

    .choices{
      bottom: 17vh;
      top: auto;
      width: 80vw;
    }

    .button-input{
      font-size: 3.5em;
    }

    .toggle{
      margin-right: 20px;
    }

    .checkbox-text{
      font-size: 3em;
    }

    .text-input{
      font-size: 2.5em;
    }
  }
</style>

<script>
  import Form from './Form.vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'
  import Timer from './Timer.vue'
  import Chat from './Chat.vue'
  import Karaoke from './Karaoke.vue'
  import Camera from './Camera.vue'

  export default {
    components: {
      Form,
      Header,
      Footer,
      Timer,
      Chat,
      Karaoke,
      Camera
    },
    data: function(){
      return {
        connected: false,
        status: '',
        showForm: true,
        showTimer: false,
        prompt: '', //-- prompt for each questions
        chat_prompt: '', //-- buffer for the chat prompt
        beginning_choice: false,
        button_choice: false,
        checkbox_choice: false,
        input_choice: false,
        single_choice: false,
        hasSubmittedConsent: false,
        checkbox_choices: [], //-- list of the choices
        checkboxes_unticked: 0, //-- keeping track of how many checkboxes are ticked or unticked
        single_choice_text: '', //--single choice
        current_mode: '', //-- current type of input [single, binary, beginning, text, checkboxes]
        choice_A: 'YES', //-- choice for binary
        choice_B: 'NO', //-- choice for binary
        showChat: false, //-- display the chat
        showChatContent: true, //-- toggle chat contents on and off, during the audience input to the chat
        additionalChatContents: '', //-- push additional lines to the chat
        showKaraoke: false, //-- display the karaoke
        message: '', //-- used at the end of the form
        popup: '', //-- popup message, used in the beginning (join the network)
        image_src: '', //-- src of the images sent to the devices
        video_src: '', //-- src of the video element that is displayed
        last_scene: '', //-- the last scene that was received, used in the storage retrieval
        showCamera: false,
        client: null,
        info: {
          id:"",
          first_name: "tPierre",
          last_name: "tDepaz",
          birthdate: "t1991-05-20",
          origin: "tFrance",
          gender: "tMale",
          marital_status: "tMarried",
          occupation: "tLehrer"
        },
      }
    },
    methods: {
      toggleBox: function(evt){

        if(this.hasSubmittedConsent)
          return

        let el;
        if(evt.target.className == 'checkbox-text')
          el = evt.target.parentNode.children[0].children[0]
        else if(evt.target.className == 'toggle-inner')
          el = evt.target
        else if(evt.target.className == 'toggle')
          el = evt.target.children[0]
        else if(evt.target.className == 'checkbox-input')
          el = evt.target.children[0].children[0]
        else
          return

        if(el.style.backgroundColor == 'white'){ //from white to blue -> ticked
          this.checkboxes_unticked--;
          el.style.backgroundColor = 'rgb(19, 53, 177)'
        }else{ //from blue to white -> unticked
          this.checkboxes_unticked++;
          el.style.backgroundColor = 'white'

        }
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
          case 'end':
            this.resetAll()
            this.prompt = "Exiting..."
            return
            break;
          default: //-- 'single' and 'binary'
            val = [evt.target.value]

        }
        console.log('choosing:', val);

        this.displayFeedback(evt.target)

        this.client.send('/control/choose', [this.current_mode, ...val])
      },
      submitConsent: function(evt){
        this.hasSubmittedConsent = true

        this.displayFeedback(evt.target)
        this.disableInputs()

        this.client.send('/control/choose', [this.current_mode, this.checkboxes_unticked])
      },
      submitForm: function(evt){
        this.info = evt

        this.message = 'Processing your application, ' + evt.first_name
        console.log('[ADMIN] - Submitting new profile for ' + evt.first_name + ' ' + evt.last_name)

        let rand = '';
        while (rand.length < 5)
          rand += Math.floor(Math.random()*10) + ''

        this.info.id = evt.first_name+'_'+evt.last_name+'_'+rand;

        if(localStorageAvailable())
          localStorage.setItem("user_id", this.info.id)

        this.client.send('/sys/subscribe', ['/user_'+this.info.id])
        setTimeout(() => {
          this.client.send('/control/join', [rand, evt.first_name, evt.last_name, evt.birthdate, evt.origin, evt.gender, evt.marital_status, evt.occupation])
        }, 100)
      },
      onTimerEnd: function(){
        this.showTimer = false
        if(this.current_mode === "input"){
          this.showChatContent = true
          this.prompt = ''
          this.input_choice = false
        }else{
          this.resetAll()
        }
      },
      curtainUp: function(){
        this.showForm = false
        this.popup = ''
        document.body.style.backgroundColor = "black"
      },
      curtainDown: function(){
        this.resetAll()
        this.cleanStorage()
        document.getElementById("window").style.display = 'none'
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'

        setTimeout(() => {
          document.body.innerHTML = `<h1 style="color: black;">POSTFACE</h1><br />
          <video style="float: left; width: 100%" src="media/end.mp4" muted autoplay></video>
          <h3 style="float: right; color: black;">THE END</h3>`
        }, 7000)

      },
      resetAll: function(){
        this.button_choice = false
        this.beginning_choice = false
        this.checkbox_choice = false
        this.single_choice = false
        this.input_choice = false
        this.showChat = false
        this.showChatContent = true
        this.showCamera = false
        this.showKaraoke = false
        this.showTextInput = false

        this.popup = ''
        this.prompt = ''
      },
      displayFeedback: function(el){
        this.disableInputs()
        this.prompt = "Thank you for your contribution ;)"
        if(el)
          el.className = "button-input selected"
      },
      displayMedia: function(name){
        if(name === "red_hood" || name === "wolf_pack")
          this.image_src = `media/${name}.png`
        else if(name === "burning_soul" || name === "shadow" || name === "news"){
          this.video_src = `media/${name}.mp4`
          let video = document.getElementsByTagName("video")[0]
          video.setAttribute('playsinline', '')
          video.play()
        }else{
          this.image_src = this.video_src = ''
        }
      },
      disableInputs: function(){
        let btns = document.getElementsByClassName("all-input")

        if(btns[0] != undefined)
          return

        for(let i = 0; i < btns.length; i++)
          btns[i].disabled = true

      },
      enableInputs: function(){
        let btns = document.getElementsByClassName("all-input")

        if(btns[0] != undefined)
          return

        for(let i = 0; i < btns.length; i++){
          btns[i].className = "button-input"
          btns[i].disabled = false
        }
      },
      onChatOver: function(){
        this.showChatContent = false
        this.input_choice = true
        this.showTimer = true
        this.prompt = this.chat_prompt
      },
      cleanStorage: function(){
        localStorage.clear()
      },
      checkStorageContents: function(){
        if(localStorageAvailable()){
          this.info.id = localStorage.getItem("user_id")
          this.last_scene = localStorage.getItem("last_scene")

          //-- first we check for the ID
          //-- if we don't have a user ID, we create one
          if(this.info.id == null){
            let rand = '';
            while (rand.length < 5)
              rand += Math.floor(Math.random()*10) + ''

            this.info.id = "Temp_User_"+rand

            localStorage.setItem("user_id", this.info.id)
          }

          //-- then we check for the scene
          if(this.last_scene == null){ //-- this means we have never participated in the show
            return
          }else{ //-- we have participated at some point
            this.curtainUp()
            switch (this.last_scene) {
              case "A Love Story":
                this.showChat = true
                break;
              case "Karaoke":
                this.showKaraoke = true
                break;
              case "Subjects End":
                console.log("show the red hood selfies");
                break;
              case "Objects End":
                console.log("show the wolf pack selfies");
                break;
              case "MTV Dance":
                console.log("switch lights");
                break;
              case "Adsvideo":
                console.log("show ads video #1");
                break;
              case "Adsvideo":
                console.log("show ads video #2");
                break;
              case "Camera":
                console.log("show the shadowmon video");
                break;
              case "Popcorn":
                console.log("show the shadowmon video");
                break;
              default:

            }
          }
        }else{
          console.log("[WARN] - No local storage available");
        }
      }
    },
    mounted(){

      this.checkStorageContents()

      this.client = new rhizome.Client()
      window.client = this.client

      this.client.start((err) => {
        if(err)
          alert(err)

          this.client.on('connected', () => {
            console.log('[SOCK] Connected');
            this.connected = true
            this.status = "Connected"
          })

          this.client.on('connection lost', function() {
            this.connected = false
            this.status = "Disconnected"
          })

          this.client.on('server full', function() {
            this.connected = false
            this.status = "Reconnecting..."
          })

        this.client.send('/sys/subscribe', ['/all'])

        if(this.info.id) //-- if we've checked the storage contents
          this.client.send('/sys/subscribe', ['/user_'+this.info.id])

        this.client.on('message', (address, args) => {
          console.log('[MSG] received at ' + address + ' - ' + args);

          switch (address) {
            case '/all/start':
              console.log('[STATE] - start');
              this.resetAll()
              this.curtainUp()
              break;
            case '/all/stop':
              console.log('[STATE] - stop');
              this.resetAll()
              break;
            case '/all/reset':
              console.log('[STATE] - start');
              this.cleanStorage()
              break;
            case '/all/next':
              console.log('[STATE] - next');

              this.resetAll()
              this.enableInputs()
              this.current_mode = args[0]
              this.showChat = false
              this.showKaraoke = false

              if(this.current_mode === "beginning"){ //-- binary choice
                this.showTimer = true //reset the timer
                this.prompt = args[1]
                this.beginning_choice = true
              }else if(this.current_mode === "binary"){
                this.showTimer = true //reset the timer
                this.prompt = args[1]
                this.button_choice = true
                this.choice_A = args[2]
                this.choice_B = args[3]
              }else if(this.current_mode === "checkboxes"){ //-- different checkboxes
                this.showTimer = true
                this.prompt = args[1]
                this.checkbox_choices = args.slice(2, args.length)
                this.checkbox_choice = true
              }else if(this.current_mode === "input"){ //-- this should be for displaying the text input
                setTimeout(() => {this.showChat = true}, 2500)
                this.chat_prompt = args[1]
              }else if(this.current_mode === "single"){
                this.showCamera = false
                this.showTimer = true
                this.single_choice = true
                this.prompt = args[1]
                this.single_choice_text = args[2]
              }else if(this.current_mode === "end"){
                this.single_choice = true
                this.prompt = args[1]
                this.single_choice_text = args[2]
                this.cleanStorage()
              }

              break;
            case '/all/current': //-- this just broadcasts what is the current scene we are playing
              console.log('[MSG] - setting current scene');
              this.last_scene = args[0]
              if(localStorageAvailable())
                localStorage.setItem("last_scene", this.last_scene)
              break;

            case '/all/result': //-- this shows the result of the choices
              console.log('[MSG] - providing results');
              this.prompt = `Most of you have chosen:\n ${args[0]}`
              setTimeout(() => {this.prompt = ''}, 4000)
              break;

            case '/all/path': //-- this shows the result of the whole path
              console.log('[MSG] - showing path');
              this.prompt = `This was your journey through this world:\n${args[0].join('\n')}\n\nHope to see you again soon.`
              break;
            case '/all/karaoke':
              console.log('[KARAOKE] - choose');
              this.showKaraoke = true
              break;
            case '/all/textinput':
              console.log('[INPUT] - received',args[0]);
              this.additionalChatContents = args[0]
              break;
            case '/all/media':
              console.log('[MEDIA] - Displaying ' + args[0]);
              this.displayMedia(args[0])
              break;
            case '/all/camera':
              console.log('[CAMERA] - Toggle ' + args[0]);
              this.resetAll()
              this.showCamera = args[0] == 'on' ? true : false
              break;
            case '/user_'+this.info.id:
              if(args[0] == 'confirmed'){
                this.showForm = false
                this.popup = "Network successfully joined.\n\nTo maintain the best connection, please avoid refreshing the page.\n\nThe show will start soon."
              }
              break;
            case '/user_'+this.info.id+'/color':
              document.body.style.backgroundColor = args[0]
              break;
            case '/all/end':
              this.curtainDown();
              break;
            default:
              console.log('[ERROR] received addr: ' + address + ' with args '+ args);
          }
        })


      })

    }
  }

  let localStorageAvailable = () => {
  var storage;
  try {
      storage = window['localStorage'];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}
</script>
