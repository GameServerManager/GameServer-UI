<template>
  <ul id="mySidenav" class="sidenav">
    <li v-for="info in serverInfo" :key="info.id">
      <router-link
        :to="{
          name: 'Server',
          path: '/Server/' + info.id,
          params: { id: info.id },
        }"
        >{{ info.name[0] }}</router-link
      >
    </li>
    <li><router-link to="/AddServer">Add Server</router-link></li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Server from "../api/server";

export default defineComponent({
  data() {
    return {
      loading: false,
      serverInfo: [] as IServer[],
      error: null,
    };
  },
  created() {
    this.fetchData();
  },
  watch: {},
  methods: {
    fetchData() {
      this.error = null;
      this.loading = true;
      console.log("fetching Names");
      Server.all()
        .then((value) => {
          this.serverInfo = value;
          console.log(value);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
</script>

<style scoped>
.sidenav {
  height: 100%;
  max-width: 25%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  overflow-x: hidden;
  margin-top: 32px;
  transition: 0.5s;
}

.sidenav a {
  padding: 0px 32px 0px 32px;
  text-decoration: none;
  font-size: 25px;
  display: block;
  transition: 0.3s;
  color: #6a6e71;
  font-weight: bold;
  border: #87c232;
  border-style: outset;
  border-radius: 10px;
}

.sidenav a:hover {
  border-style: inset;
}

.sidenav {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 0px;
  margin-top: 0px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: left;
  border-right: solid;
  border-color: #618930;
  border-radius: 15px;
}

li {
  padding: 10px 5px 5px 0px;
}

li:last-child {
  width: calc(100% - 5px);
  margin: 10px 5px 5px 0px;
  position: absolute;
  bottom: 0;
}
</style>