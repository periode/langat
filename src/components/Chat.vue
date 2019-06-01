<template>
  <div  v-if="showChat" class="chat-holder centered">
    <div class="chat-switch">
      <img src="media/switch.png" alt="switch icon" @click="point_of_view = point_of_view == 'L1' ? 'L2' : 'L1'"/>
    </div>
    <div class="chat-scroll" id="chat_scroll">
      <div v-for="display in displayed" class="single-post">
        <div>
          <div v-if="display.type === 'control'" class="control">
            {{ display.text }}
          </div>
          <div v-else :class="point_of_view === display.sender ? 'message left' : 'message right'">
            <div class="sender">
              {{display.sender}}
            </div>
            <div class="content" v-if="display.type !== 'control'">
              {{ display.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-input">
      {{typing_text}}
    </div>
  </div>
</template>
<style scoped>
.chat-holder{
  width: 90%;
  height: 80%;
  background-color: white;
  border: 2px solid #1335B1;
  color: #1335B1;
}

.chat-scroll{
  overflow-y: scroll;
  height: 87%;
  border-bottom: 2px solid #1335B1;
}

.chat-switch{
  width: 100%;
  height: 5%;
  background-color: #1335B1;
}

.chat-input{
  background-color: #1335B1;
  border-radius: 15px;
  text-align: right;
  color: white;
  margin-top: 1%;
  margin-bottom: 1%;
  margin-right: 1%;
  padding-right: 3%;
  height: 6%;
  float: right;
  width: 95%;
  line-height: 30px;
}

.left, .right{
  width: 98%;
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: 1%;
  margin-right: 1%;
}

.left{
  float: left;
  text-align: left;
}

.left .sender, .left .content{
  float: left;
}

.right {
  float: right;
  text-align: right;
}

.right .sender, .right .content{
  float: right;
}

.message{
  overflow: auto;
  height: auto;
  width: 60%;
  margin: 2%;
  border: 2px solid #1335B1;
  border-radius: 5px;
  padding: 5px;
}

.right{
  background-color: #1335B1;
  color: white;
}

.left{
  background-color: white;
  color: #1335B1;
  border: 2px solid #1335B1;
}

.control{
  width: 100%;
  text-align: center;
  font-size: 0.8em;
  font-style: italic;
  float: left;
}

.sender{
  font-size: 0.7em;
  width: 80%;
  font-style: italic;
}

.content{
  width: 100%;
}

.chat-switch img{
  height: 24px;
}
</style>
<script>
const dialogue = require('../dialogue.js')

export default {
  data: function() {
    return {
      displayed: [],
      point_of_view: 'L1',
      index: 0,
      chat_scroll: null,
      typing_text: ''
    }
  },
  props: {
    showChat: Boolean,
    showChatContent: Boolean,
    additionalChatContents: String
  },
  watch: {
    showChat: function(newVal, oldVal){
      if(newVal){
        //when turned on chat

        setTimeout(this.addNewMessage, 1000)
      }else{

      }
    },
    showChatContent: function(newVal, oldVal){
      if(newVal){
        this.chat_scroll.style.visibility = 'visible'
      }else{
        this.chat_scroll.style.visibility = 'hidden'
      }
    },
    additionalChatContents: function(newVal, oldVal){
      let msg = {
        "type": "message",
        "sender": "L1",
        "text": newVal
      }
      this.displayed.push(msg)
      this.chat_scroll.scrollTop = this.chat_scroll.scrollHeight
    }
  },
  methods: {
    addNewMessage: function(){
      if(!this.chat_scroll)
        this.chat_scroll = document.getElementById('chat_scroll')

      this.displayed.push(dialogue[this.index])
      this.chat_scroll.scrollTop = this.chat_scroll.scrollHeight

      if(this.index < dialogue.length-1 && dialogue[this.index + 1].sender != '')
        this.typing_text = dialogue[this.index + 1].sender + ' is typing...'
      else
        this.typing_text = ''

      this.index++

      if(this.index < dialogue.length){
        // let rand = Math.floor(Math.random()*2000+4000)
        let rand = Math.floor(Math.random()*1000)
        setTimeout(this.addNewMessage, rand)
      }else{
        this.$emit('chat-over')
      }
    }
  },
  mounted(){

  }
}
</script>
