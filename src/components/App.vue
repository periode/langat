<template>
  <div>
    <header>
      Threads
    </header>
    <main>
      <div id="prompt">
        Select an area of interest
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
    </main>
    <footer>

    </footer>
  </div>
</template>

<script>
  module.exports = {
    data: function(){
      return {
        button_choice: true,
        checkbox_choice: false,
        input_choice: false
      }
    },
    methods: {
      submitChoice: function(evt){
        console.log(evt);
      }
    },
    mounted(){
      let client = new rhizome.Client()

      client.start(function(err){
        if(err)
          alert(err)

        client.on('connected', function() {
          console.log('connected');
        })

        //-- the rest of the socket code goes here
      })

    }
  }
</script>
