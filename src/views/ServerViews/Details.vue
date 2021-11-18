<script setup>
</script>

<template>
<div class="TabContent">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="servers" >
      <h2>{{ servers.name }}</h2>
      <p>{{ servers.comment }}</p>
      <p>{{ servers.discription }}</p>
      <p>{{ servers.status }}</p>
      <p>{{ servers.state }}</p>
    </div>

  </div>
</template>

<script lang="ts">
import Server from "../../api/serverMock"
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      loading: false,
      id: "",
      servers: null as IServer | null | undefined,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route.params.id': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = null
      this.loading = true
      let fetchedId = this.$route.params.id as string
      this.id = fetchedId
      if(fetchedId !== undefined){
        console.log("fetching Data for: " + fetchedId)
        this.servers = Server.get(fetchedId);
      }
      this.loading = false
    }
  },
})
</script>

<style scoped>
.TapContent{
  width: 85%;
  position: fixed;
  left: 15%;
  top: 15%;
}
</style>
