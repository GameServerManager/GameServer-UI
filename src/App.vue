<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

</script>

<template>
  <ul>
      <li><router-link to="/">Home</router-link></li>
      <li v-for="name in serverNames" :key="name.name"><router-link :to="{name: 'Server', path: '/Server/' + name.name, params: { id: name.name}}">{{ name.name }}</router-link></li>
      <li><router-link to="/AddServer">Add Server</router-link></li>
    </ul>
    <router-view></router-view>
</template>

<script>
import Server from "./api/serverMock";


export default {
  data () {
    return {
      loading: false,
      serverNames: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      console.log("fetching Names")
      this.serverNames = Server.all();
      this.loading = false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
