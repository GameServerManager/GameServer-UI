<script setup>
</script>

<template>
  <div class="tab content">
    <router-link class="tablinks target" :to="{name: 'Details', path: '/Server/' +  id + '/Details'}">ServerDetails</router-link>
    <router-link class="tablinks target" :to="{name: 'Ressources', path: '/Server/' +  id + '/Ressources'}">ServerDetails</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Server from "../api/serverMock"
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      loading: false,
      id: "",
      error: null
    }
  },
  created () {
    this.id = this.$route.params.id as string
  },
  watch: {
  },
  methods: {
  },
})
</script>

<style scoped>
.tab {
  overflow: hidden;
  background-color: #222629;
  height: 5%;
}

/* Style the buttons inside the tab */
.tab a {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}

.tab a:active{
  background-color: #474a4f;
}

/* Change background color of buttons on hover */
.tab a:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
  background-color: #ccc;
}
:target {
  background-color: red;
}

</style>
