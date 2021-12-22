<script setup>
</script>

<template>
<div class="TabContent">
    <h2>Advanced</h2>

    <div v-if="loading" class="loading">
      Loading... Connecting to Container
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-if="!loading" class="console">
      <span>{{ Log }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Server from "../../api/server"
import { defineComponent } from 'vue'
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

export default defineComponent({
  data () {
    return {
      connection: new HubConnectionBuilder()
        .withUrl('https://localhost:7123/consoleHub')
        .configureLogging(LogLevel.Debug)
        .build(),
      loading: true,
      error: null,
      Log: ""
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    var connected = this.connection.start()
    let fetchedId = this.$route.params.id as string
    Server.getLogs(fetchedId).then((value) =>{
      this.Log += value;
      connected.then(() => {
          this.loading = false
          this.connection.send("Attach", fetchedId)
        })
        .catch((err) => this.error = err)
      this.connection.on("ConsoleMessage", (id, message) => { 
      if (fetchedId === id) {
        this.Log += message;
      }
      });
    });
  },
  watch: {
    // call again the method if the route changes
  },
  methods: {
  },
})
</script>

<style scoped>
a {
  color: #00ff8c;
}

.console{
  background-color: black;
  color: lightgray;
  height: inherit;
  margin: 10px;
  font-size: 20px;
  text-align: start;
}
.console span {
  position: absolute;
  white-space: pre-wrap;
  left: 20px;
  bottom: 30px;
}
</style>
