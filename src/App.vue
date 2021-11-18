<template>
  <img class="profile" src="./assets/profile.png" />
  <SideBar></SideBar>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Server from "./api/serverMock";
import SideBar from "./components/SideBar.vue"

export default defineComponent({
    components: { SideBar }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

body{
  background-color: #222629;
  color: rgb(225, 225, 225);
}

h1, h2, h3,
h4, h5, h6 {
  color: #6A6E71;
}
.sidenav{
  width: 15%; 
}

.content{
  width: 85%;
  position: fixed;
  left: 15%;
  top: 5%;
}

.TabContent{
  width: 85%;
  position: fixed;
  left: 15%;
  top: 10%;
} 

.profile{
  z-index: 1;
  position: absolute;
  right: 0;
  top: 0;
  height: 8%;
  margin: 10px;
  margin-right: 20px;
  border-radius: 8px;
}

</style>
