<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

</script>

<template>
  <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/Server/Server1">Server 1</router-link></li>
      <li><router-link to="/Server/Server2">Server 2</router-link></li>
      <li><router-link to="/Server/Server3">Server 3</router-link></li>
      <li><router-link to="/AddServer">Add Server</router-link></li>
    </ul>
    <router-view></router-view>
</template>


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
