<script lang="ts">
import Login from "../api/login";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      userName: "",
      passwort: "",
      maudiSecret: "",
      register: false,
    };
  },
  created() {},
  watch: {
    // call again the method if the route changes
  },
  methods: {
    LoginRequest() {
      Login.login(this.userName, this.passwort).then((token) => {
        console.log(this.$store.state.isLoggedIn);
        this.$store.commit("LogIn", token);
        console.log(this.$store.state.isLoggedIn);

        this.$router.push("/");
      });
    },
    RegisterRequest() {
      Login.register(this.userName, this.passwort, this.maudiSecret);
    },
  },
});
</script>

<template>
  <div class="content">
    <h2 v-if="!register">Login</h2>
    <h2 v-if="register">Register</h2>
    <form>
      <input type="text" placeholder="Benutzername" v-model="userName" /><br />
      <input type="password" placeholder="Passwort" v-model="passwort" /><br />
      <input
        type="text"
        placeholder="Maudi Secret"
        v-model="maudiSecret"
        v-if="register"
      /><br />
      <input type="checkbox" name="registered" v-model="register" />
      <label for="registered">register?</label><br />
    </form>
    <button v-on:click="LoginRequest" class="button" v-if="!register">
      Login</button
    ><br />
    <button v-on:click="RegisterRequest" class="button" v-if="register">
      Register</button
    ><br />
  </div>
</template>

<style scoped>
body {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

h2 {
  color: #618930;
}

.content {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -225px;

  width: 500px;
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: center;
  border: #618930;
  border-style: solid;
  border-radius: 10px;
}

input[type="text"],
input[type="password"] {
  width: 300px;
  height: 50px;
  font-size: 18px;
  margin-bottom: 20px;
  padding-left: 5px;
}

.button {
  width: 150px;
  height: 50px;
  font-size: 18px;
  margin-top: 15px;
  background-color: #000;
  color: #fff;
  border: #fff solid 1px;
}

.button:hover {
  background-color: #fff;
  color: #000;
  cursor: pointer;
}
</style>
