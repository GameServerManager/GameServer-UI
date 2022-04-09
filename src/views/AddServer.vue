<template>
  <div class="content">
    <h1>Add Server</h1>
    <table class="outerTable">
      <tr>
        <td class="lab">
          <label for="name">Name:</label>
        </td>
        <td class="inp">
          <input type="Textfield" name="name" v-model="name" /><br />
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label for="comment">Comment:</label>
        </td>
        <td class="inp">
          <textarea name="comment" rows="3" v-model="comment"></textarea>
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label for="description">Discription:</label>
        </td>
        <td class="inp">
          <textarea
            name="discription"
            rows="3"
            v-model="description"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label for="image">Image:</label>
        </td>
        <td class="inp">
          <input type="Textfield" name="image" v-model="image" />
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label for="mount">Mount:</label>
        </td>
        <td class="inp">
          <input type="Textfield" name="mount" class="splitText hostPath" />
          <input type="Textfield" name="mount" class="splitText serverPath" />
          <br />
          <button class="add" v-on:click="Add">✚</button>
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label for="ports">Ports:</label>
        </td>
        <td class="inp">
          <input type="Textfield" name="ports" class="splitText hostPorts" />
          <input type="Textfield" name="ports" class="splitText serverPorts" />
          <br />
          <button class="add" v-on:click="Add">✚</button>
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label for="startScript">Start Script (bash):</label>
        </td>
        <td class="inp">
          <textarea
            name="startScript"
            rows="3"
            v-model="startScript"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label for="UpdateScript">Update Script (bash):</label>
        </td>
        <td class="inp">
          <textarea
            name="UpdateScript"
            rows="3"
            v-model="updateScript"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label for="InstallScript">Install Script (bash):</label>
        </td>
        <td class="inp">
          <textarea
            name="InstallScript"
            rows="3"
            v-model="installScript"
          ></textarea>
        </td>
      </tr>
      <tr>
        <td class="lab">
          <label>Variable:</label>
        </td>
        <td class="inp">
          <table class="innerTable">
            <tr>
              <td class="lab"><label for="varName">Name:</label></td>
              <td class="inp">
                <input type="Textfield" name="varName" class="VarName" />
              </td>
            </tr>
            <tr>
              <td class="lab">
                <label for="varDescription">Discription:</label>
              </td>
              <td class="inp">
                <input
                  type="Textfield"
                  name="varDescription"
                  class="varDescription"
                />
              </td>
            </tr>
            <tr>
              <td class="lab"><label for="varValue">Value:</label></td>
              <td class="inp">
                <input type="Textfield" name="varValue" class="varValue" />
              </td>
            </tr>
          </table>
          <br />
          <button class="add" v-on:click="AddVariable">✚</button>
        </td>
      </tr>
    </table>
    <button class="AddServerButton" v-on:click="SubmitRequest">
      Add Server
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Server from "../api/server";

export default defineComponent({
  data() {
    return {
      name: "",
      comment: "",
      description: "",
      image: "",
      installScript: "",
      updateScript: "",
      startScript: "",
    };
  },
  created() {},
  watch: {
    // call again the method if the route changes
  },
  methods: {
    AddVariable(e: MouseEvent) {
      let target = e.target as HTMLElement;

      let table = this.tableCreate();

      target?.parentElement?.insertBefore(table, target.previousSibling);
    },
    Add(e: MouseEvent) {
      let target = e.target as HTMLElement;
      let br = target.previousSibling as HTMLElement;

      let sipServer = br.previousSibling as HTMLElement;
      let sipHost = sipServer.previousSibling as HTMLElement;

      target?.parentElement?.insertBefore(
        this.createInput(Array.from(sipHost.classList)),
        target
      );
      target?.parentElement?.insertBefore(
        this.createInput(Array.from(sipServer.classList)),
        target
      );

      let newTextField3 = document.createElement("br") as HTMLBRElement;
      target?.parentElement?.insertBefore(newTextField3, target);
    },
    createInput(classes: string[]) {
      let newTextField = document.createElement("Input") as HTMLInputElement;
      newTextField.type = "Textfield";
      classes.forEach((v, k) => {
        newTextField.classList.add(v);
      });
      return newTextField;
    },
    tableCreate() {
      let tbl = document.createElement("table");
      tbl.classList.add("innerTable");
      let labels = ["Name", "Discription", "Value"];
      labels.forEach((value, i) => {
        const tr = tbl.insertRow();
        const tdLabel = tr.insertCell();
        tdLabel.classList.add("lab");
        tdLabel.appendChild(document.createTextNode(value + ":"));

        const tdInput = tr.insertCell();
        tdInput.classList.add("inp");
        tdInput.appendChild(this.createInput(["var" + value]));
      });

      return tbl;
    },
    SubmitRequest(e: MouseEvent) {
      let mounts = this.getMounts();
      let ports = this.getPorts();
      let variables = this.getVariables();

      let config: serverConfig = {
        name: this.name,
        comment: this.comment,
        description: this.description,
        image: this.image,
        mounts: mounts,
        ports: ports,
        containerScripts: {
          instalationScript: {
            scriptCommand: this.installScript,
            entrypoint: "bash",
          },
          startScript: {
            scriptCommand: this.startScript,
            entrypoint: "bash",
          },
          updateScript: {
            scriptCommand: this.updateScript,
            entrypoint: "bash",
          },
        },
        variables: variables,
      };
      Server.import(config)
        .then((id) => this.$router.push("/Server/" + id + "/Details"))
        .catch((err) => {
          console.log(err);
        });
    },
    getMounts() {
      let hostMounts = document.getElementsByClassName(
        "hostPath"
      ) as HTMLCollectionOf<HTMLInputElement>;
      let serverMounts = document.getElementsByClassName(
        "serverPath"
      ) as HTMLCollectionOf<HTMLInputElement>;

      let mounts: mountingPoint[] = [];

      for (let i = 0; i < hostMounts.length; i++) {
        const hostMount = hostMounts[i];
        const serverMount = serverMounts[i];
        mounts.push({
          hostPath: hostMount.value,
          serverPath: serverMount.value,
        });
      }
      return mounts;
    },
    getPorts() {
      let hostPorts = document.getElementsByClassName(
        "hostPorts"
      ) as HTMLCollectionOf<HTMLInputElement>;
      let serverPorts = document.getElementsByClassName(
        "serverPorts"
      ) as HTMLCollectionOf<HTMLInputElement>;

      let ports: portMap[] = [];

      for (let i = 0; i < hostPorts.length; i++) {
        const hostPort = hostPorts[i];
        const serverPort = serverPorts[i];
        ports.push({
          hostPorts: hostPort.value.replace(" ", "").split(","),
          serverPort: serverPort.value,
        });
      }
      return ports;
    },
    getVariables() {
      let varNames = document.getElementsByClassName(
        "VarName"
      ) as HTMLCollectionOf<HTMLInputElement>;
      let varDescriptions = document.getElementsByClassName(
        "varDescription"
      ) as HTMLCollectionOf<HTMLInputElement>;
      let varValues = document.getElementsByClassName(
        "varValue"
      ) as HTMLCollectionOf<HTMLInputElement>;

      let variables: variable[] = [];

      for (let i = 0; i < varNames.length; i++) {
        const varName = varNames[i];
        const varDescription = varDescriptions[i];
        const varValue = varValues[i];
        variables.push({
          name: varName.value,
          description: varDescription.value,
          envVariable: varValue.value,
          defaultValue: varValue.value,
          userEditable: true,
          userViewable: true,
        });
      }
      return variables;
    },
  },
});
</script>

<style>
.content {
  position: inherit;
  right: 0;
  width: 100%;
}
.outerTable {
  padding: 20px;
  width: calc(100% - 40px);
  margin: 20px;
  border-collapse: collapse;
}
.outerTable td {
  text-align: left;
  padding: 5px;
  border: 4px solid #3d561e;
}
.innerTable {
  width: 24%;
  border: 2px solid #598027;
  border-collapse: collapse;
  margin-bottom: 5px;
  margin-left: 5px;
  display: inline-table;
}
.innerTable td {
  border: none;
}
.lab {
  width: 0%;
}
.inp {
  width: 100%;
}
.add {
  background: none;
  border: none;
  outline: none;
  color: #628a30;
  font-size: 25px;
}
.splitText:nth-of-type(2n) {
  margin-left: 6px;
  margin-top: 5px;
}
.splitText {
  width: calc(50% - 7px);
}
input,
textarea {
  background: gray;
  border: none;
  outline: none;
  width: inherit;
  word-break: break-all;
}
.AddServerButton {
  position: fixed;
  bottom: 25px;
  right: 25px;
  color: #e2ede7;
  background-color: #7fa140;
  border: 5px solid #435522;
  border-radius: 5px;
  height: 50px;
  width: 150px;
  font-size: 25px;
}
</style>
