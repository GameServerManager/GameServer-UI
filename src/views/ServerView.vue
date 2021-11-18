<script setup>
</script>

<template>
  <div class="tab content">
    <router-link class="tablinks" id="Details" @click="highlight($event)" :to="{name: 'Details', path: '/Server/' +  id + '/Details'}">Details</router-link>
    <router-link class="tablinks" id="Ressources" @click="highlight($event)" :to="{name: 'Ressources', path: '/Server/' +  id + '/Ressources'}">Ressources</router-link>
    <router-link class="tablinks" id="Advanced" @click="highlight($event)" :to="{name: 'Advanced', path: '/Server/' +  id + '/Advanced'}">Advanced</router-link>
    <router-link class="tablinks" id="Export" @click="highlight($event)" :to="{name: 'Export', path: '/Server/' +  id + '/Export'}">Export</router-link>
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
    this.$router.push({ name: 'Details', path: '/Server/' +  this.id + '/Details' })

  },
  watch: {
    '$route.params.id': 'init',
    '$route'(to, from) {
        if(to.fullPath.split("/").length == 3) {
          this.init();
        }
      }
  },
  methods: {
    highlight(event: any) {
        console.log(event.target);
        this.resetHighlite();
        event.target.style.backgroundColor = "#474a4f"
        event.target.style.borderLeft = "solid #618930"
        event.target.style.borderRight = "solid #618930"
        let currentElement : HTMLElement | null = event.target.previousElementSibling;
        while (true) {
          if (currentElement == null) {
            break;
          }
          currentElement.style.borderRight = "none"
          currentElement.style.borderLeft = "solid #618930"
          currentElement = currentElement.previousElementSibling as HTMLElement
        }
    },

    resetHighlite(){
      let elements = document.getElementsByClassName("tablinks");
      let first = true
      Array.prototype.forEach.call(elements, function(el) {
        el.style.backgroundColor = "#222629"
        if(!first){
          el.style.borderLeft = "none"
        }
        el.style.borderRight = "solid #618930"
        first = false
      });
    },

    init(){
      this.resetHighlite()
      let elements = document.getElementsByClassName("tablinks") as HTMLCollectionOf<HTMLElement>;
      elements[0].style.backgroundColor = "#474a4f"
      elements[0].style.borderLeft = "solid #618930"
      if(this.$route.params.id !== undefined){
        this.$router.push({ name: 'Details', path: '/Server/' +  this.id + '/Details' })
      }
    }
  },
})
</script>

<style scoped>
.tab {
  margin-left: 12px;
  overflow: hidden;
  background-color: #222629;
  height: 5%;
}

/* Style the buttons inside the tab */
.tab a {
  background-color: inherit;
  float: left;
  border: solid;
  border-color: #618930;
  border-radius: 15px;
  border-bottom: none;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-left: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 17px;
}
.tab #Details {
  border-left: solid #618930;
}

.tab a{
  text-decoration: none; /* no underline */
  color: #6a6e71;
  font-weight: bold;
  font-size: 20px;

}


.TabContent{
  --borderPixel: 12px;
  margin: 0px var(--borderPixel) 6px;
  height: 88%;
  width: calc(85% - (2 * var(--borderPixel)));
  border: solid;
  border-color: #618930;
  border-radius: 15px;
  border-top-left-radius: 0px;
}

</style>
