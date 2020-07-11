<template>
  <div id="app">
    <Board/>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  padding: 0;
}
p {
  margin: 0;
}
</style>
