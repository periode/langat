<template>
  <div>
    <Header/>
    <main>
      <div class="popup centered" v-if="popup.length > 0">
        {{ popup }}
      </div>
      <Form v-if="showForm" @formCompleted="submitForm" :message="message" :connected="connected"/>
      <span v-else>
        <div id="prompt">
          {{ prompt }}
        </div>
        <div id="choices">
          <span v-if="button_choice == true">
            <button class="button-input" @click="submitChoice" value="A">choice A</button>
            <button class="button-input" @click="submitChoice" value="B">choice B</button>
          </span>
          <span v-if="checkbox_choice == true">

          </span>
          <span v-if="input_choice == true">
            <input class="text-input" type="text" placeholder="Enter your thoughts here..."/>
          </span>
        </div>
      </span>

    </main>
    <Footer/>
  </div>
</template>

<style scoped>
  .popup{
    height: 300px;
    width: 300px;
    font-size: 1.2em;
    white-space: pre-line;
    text-align: center;
  }
</style>

<script>
  import Form from './Form.vue'
  import Header from './Header.vue'
  import Footer from './Footer.vue'

  export default {
    components: {
      Form,
      Header,
      Footer
    },
    data: function(){
      return {
        connected: false,
        showForm: true,
        prompt: '',
        button_choice: false,
        checkbox_choice: false,
        input_choice: false,
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
        }
      }
    },
    methods: {
      submitInformation: function(evt){

      },
      submitChoice: function(evt){
        console.log(evt);
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
      }
    },
    mounted(){
      this.client = new rhizome.Client()

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
              document.body.setAttribute('style', 'background: black')
              break;
            case '/all/next':
              console.log('[STATE] - next');
              this.prompt = args[0]
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

        //-- the rest of the socket code goes here
      })

    }
  }
</script>
