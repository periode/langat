<template>
  <div class="form-holder">
    <button v-if="isWelcome && connected" class="welcome centered" @click="showForm()">JOIN THE NETWORK</button>
    <form v-if="isProgress && connected" v-on:submit.prevent>
      <label for="first_name">
        First Name:
      </label>
      <input type="text" name="first_name" v-model="info.first_name"/>
      <label for="last_name">
        Last Name:
      </label>
      <input type="text" name="last_name" v-model="info.last_name"/>
      <label for="email">
        Email:
      </label>
      <input type="email" name="email" v-model="info.email"/>
      <label for="birthdate">
        Birthdate:
      </label>
      <input type="date" name="birthdate" v-model="info.birthdate"/>
      <label for="origin">
        Origin:
      </label>
      <!-- <input type="text" name="origin" v-model="info.origin"/> -->
      <select name="origin" v-model="info.origin">
        <option value="Finland" default>
          Finland
        </option>
        <option value="Other">
          Other
        </option>
      </select>
      <label for="gender">
        Gender:
      </label>
      <!-- <input type="text" v-model="info.gender"/> -->
      <select name="gender" v-model="info.gender">
        <option value="Male">
          Male
        </option>
        <option value="Female">
          Female
        </option>
        <option value="None">
          None
        </option>
      </select>
      <label for="marital_status">
        Marital Status:
      </label>
      <!-- <input type="text" v-model="info.marital_status"/> -->
      <select name="marital_status" v-model="info.marital_status">
        <option value="Married">
          Married
        </option>
        <option value="Single">
          Single
        </option>
        <option value="Looking">
          Looking
        </option>
      </select>
      <label for="occupation">
        Occupation:
      </label>
      <input type="text" v-model="info.occupation"/>
      <input type="submit" @click="submitInfo()" value="JOIN">
    </form>
    <div class="message-box centered" v-if="isSubmission && connected">
      {{ message }}
    </div>
    <div class="message-box centered" v-if="!connected">
      We're getting you connected, please wait a moment.
    </div>
  </div>
</template>
<style scoped>
  .message-box{
    font-size: 1.2em;
    border: 3px solid #1335B1;

    height: 100px;
    width: 300px;

    text-align: center;
    line-height: 50px;

    font-style: italic;
  }

  .welcome{
    height: 100px;
    font-size: 1.5em;
    width: 300px;

    text-align: center;

    border: 5px solid;
    background-color: #1335B1;
    color: white;
  }

  form{
    width: 90%;
    margin: auto;
    padding-bottom: 50px;
  }

  label, input, select{
    float: left;
    margin: 2%;
    width: 96%;
    font-size: 1.2em;
  }

  input[type=text], input[type=email], input[type=date]{
    border: none;
    border-bottom: 2px solid black;
  }

  input[type=submit]{
    height: 40px;
    font-size: 25px;
    width: 96%;
    border: 2px solid #1335B1;
    background-color: #1335B1;
    color: white;
  }
</style>
<script>
  export default {
    data: function(){
      return {
        isWelcome: true,
        isProgress: false,
        isSubmission: false,
        isDone: false,
        info: {
          first_name: '',
          last_name: '',
          birthdate: '',
          origin: 'Choose',
          gender: 'Choose',
          marital_status: 'Choose',
          occupation: ''
        }
      }
    },
    props: {
      message: String,
      connected: Boolean
    },
    methods: {
      showForm: function(evt){
        this.isWelcome = false
        this.isProgress = true
      },
      submitInfo: function(evt){
        this.isProgress = false
        this.isSubmission = true

        this.$emit('formCompleted', this.info)
      }
    },
    mounted(){

    }
  }
</script>
