<script setup>
</script>

<template>
  <div class="TabContent">
    <h2>Logs</h2>

    <div v-if="loading" class="loading">Loading... Connecting to Container</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="!loading" class="console">
      <div class="ScriptSelection">
        <select
          name="NameSelection"
          id="NameSelection"
          v-on:change="updateSelection"
        ></select>
        <select
          name="IdSelection"
          id="IdSelection"
          v-on:change="updateLogs"
        ></select>
      </div>
      <span>{{ Log }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Server from "../../api/server";
import { defineComponent } from "vue";
import { HttpClient, HubConnectionBuilder, LogLevel } from "@aspnet/signalr";

export default defineComponent({
  data() {
    const token = this.$store.getters.jwtToken;
    return {
      connection: new HubConnectionBuilder()
        .withUrl("https://localhost:7123/consoleHub", {
          accessTokenFactory: () => token,
        })
        .configureLogging(LogLevel.Trace)
        .build(),
      loading: true,
      error: null,
      Log: "",
      input: "",
      LogCache: {},
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    var connected = this.connection.start();
    let fetchedId = this.$route.params.id as string;

    this.connection.on("ConsoleMessage", (id, message) => {
      if (fetchedId === id) {
        Object.keys(message).forEach((scriptName) => {
          if (!this.LogCache[scriptName]) {
            this.LogCache[scriptName] = {};
          }
          Object.keys(message[scriptName]).forEach((id) => {
            if (!this.LogCache[scriptName][id]) {
              this.LogCache[scriptName][id] = "";
            }
            this.LogCache[scriptName][id] += message[scriptName][id];
          });
        });
      }
      this.updateSelection();
    });

    connected
      .then(() => {
        this.loading = false;
        this.connection.send("Attach", fetchedId, true);
      })
      .catch((err) => (this.error = err));
  },
  watch: {
    // call again the method if the route changes
  },
  methods: {
    updateSelection() {
      let nameselection = document.getElementById(
        "NameSelection"
      ) as HTMLSelectElement;
      let preselectedName = nameselection.value;

      while (nameselection.hasChildNodes()) {
        nameselection.lastChild?.remove();
      }
      let names = Object.keys(this.LogCache);
      names.forEach((scriptName) => {
        var opt = document.createElement("option");
        opt.value = scriptName;
        opt.innerHTML = scriptName;

        nameselection?.appendChild(opt);
      });

      if (preselectedName) {
        nameselection.value = preselectedName;
      } else {
        nameselection.value = nameselection.options[0].value;
      }

      let idselection = document.getElementById(
        "IdSelection"
      ) as HTMLSelectElement;
      let preselectedId = idselection.value;
      while (idselection.hasChildNodes()) {
        idselection.lastChild?.remove();
      }

      if (this.LogCache[nameselection?.value]) {
        Object.keys(this.LogCache[nameselection?.value]).forEach((id) => {
          var opt = document.createElement("option");
          opt.value = id;
          opt.innerHTML = this.shorten(id, 10);
          idselection?.appendChild(opt);
        });
        if (preselectedId) {
          idselection.value = preselectedId;
        } else {
          idselection.value = idselection.options[0].value;
        }
      }
      this.updateLogs();
    },
    updateLogs() {
      let nameselection = document.getElementById(
        "NameSelection"
      ) as HTMLSelectElement;
      let idselection = document.getElementById(
        "IdSelection"
      ) as HTMLSelectElement;
      this.Log = "";
      if (nameselection?.value) {
        this.Log = this.LogCache[nameselection?.value][idselection?.value];
      }
    },
    shorten(str, n) {
      return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
    },
  },
});
</script>

<style scoped>
a {
  color: #00ff8c;
}

.console {
  background-color: black;
  color: lightgray;
  height: inherit;
  margin: 10px;
  font-size: 20px;
  text-align: start;
}
.console span {
  width: calc(100% - (2 * 10px));
  display: block;
  overflow-x: auto;
  height: inherit;
  position: absolute;
  white-space: pre-wrap;
  left: 20px;
  bottom: 20px;
}
.console .consoleInput {
  position: absolute;
  width: fit-content;
  background-color: rgb(99, 99, 99);
  width: calc(100% - (2 * 10px)); /* 10px come from .console margin*/
  bottom: 10px;
}

.console input {
  background: none;
  border: none;
  outline: none;
  width: inherit;
  position: inherit;
  height: 100%;
  word-break: break-all;
  color: lightgray;
  caret-color: lightgray;
}

.ScriptSelection {
  position: absolute;
  right: 20px;
  z-index: 1;
}
</style>
