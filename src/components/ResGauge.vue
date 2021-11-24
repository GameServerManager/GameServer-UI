<template>
  <gauge
        heading="A title goes here"
        :min="0"
        :max="100"
        :value="exampleValue"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
//import VueGauge from 'vue-gauge';
 
export default defineComponent({
  components: {
  //  VueGauge  
  },
  data () {
    return {
        exampleValue: 35    
    }
  },
  created () {
 
  },
  watch: {
  },
  methods: {
  
  }
})
</script>

<style scoped>

</style>