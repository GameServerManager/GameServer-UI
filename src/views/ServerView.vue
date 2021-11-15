<script setup>
</script>

<template>
<div class="post">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="servers" class="content">
      <h2>{{ servers.name }}</h2>
      <p>{{ servers.comment }}</p>
      <p>{{ servers.discription }}</p>
      <p>{{ servers.status }}</p>
      <p>{{ servers.state }}</p>
    </div>
  </div></template>

<script>
import Server from "../api/server";


export default {
  data () {
    return {
      loading: false,
      servers: null,
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
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      const fetchedId = this.$route.params.id
      if(fetchedId !== undefined){
        console.log("fetching Data for: " + fetchedId)
        this.servers = Server.get(fetchedId);
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
a {
  color: #00ff8c;
}
</style>
