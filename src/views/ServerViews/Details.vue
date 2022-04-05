<script setup>
</script>

<template>
  <div class="TabContent">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="servers">
      <h2>{{ servers.name }}</h2>
      <p>{{ servers.status }}</p>
      <p>{{ servers.state }}</p>

      <button v-if="servers.state == 'running'" v-on:click="stop">Stop</button>
      <button
        v-if="
          servers.state == 'created' ||
          servers.state == 'exited' ||
          servers.state == 'paused'
        "
        v-on:click="start"
      >
        Start
      </button>
      <p v-if="servers.state == 'restarting'">Restarting please wait</p>
      <p v-if="servers.state == 'dead'">
        Server is Dead D,: please contact Admin
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Server from "../../api/server";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      loading: false,
      id: "",
      servers: null as IServer | null | undefined,
      error: null,
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    "$route.params.id": "fetchData",
  },
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;
      let fetchedId = this.$route.params.id as string;
      this.id = fetchedId;
      if (fetchedId !== undefined) {
        console.log("fetching Data for: " + fetchedId);
      }
      this.loading = false;
    },
    start() {
      let fetchedId = this.$route.params.id as string;

      Server.start(fetchedId);
    },
    stop() {
      let fetchedId = this.$route.params.id as string;

      Server.stop(fetchedId);
    },
    update() {
      let fetchedId = this.$route.params.id as string;

      Server.get(fetchedId).then((value) => {
        this.servers = value;
      });
    },
    startUpdate() {
      (window as any).interval = setInterval(this.update, 1000);
    },
  },
  mounted() {
    clearInterval((window as any).interval);
    this.startUpdate();
  },
});
</script>

<style scoped>
.TapContent {
  width: 85%;
  position: fixed;
  left: 15%;
  top: 15%;
}
</style>
