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

    <h2>Export</h2>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      loading: false,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
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
</style>
