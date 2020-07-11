<template>
  <div class="board">
    <List
      v-for="(list, idx) in lists"
      :key="list.id + idx"
    />
  </div>
</template>

<script>
import List from "@/components/BoardList"
import { createList } from "@/entities/index"
export default {
  name: "Board",

  components: {
    List
  },

  data() {
    return {
      lists: [ createList("Kek") ],
    }
  },
}
</script>

<style lang="scss">
.board{
  max-height: 100vh;
  height: 100vh;
  background: royalblue;
  display: flex;
  user-select: none;
}
</style>