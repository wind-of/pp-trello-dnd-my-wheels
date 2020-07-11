<template>
  <div class="board">
    <List
      v-for="(list, idx) in lists"
      :key="list.id + idx"
    />
    <ListComposer
        v-model="listTitle"
        :listComposing="listComposing"
        @list-composing-toggle="onListComposingToggle"
        @add-list="onAddList"
    />
  </div>
</template>

<script>
import List from "@/components/BoardList"
import ListComposer from "@/components/BoardComposerList"
import { createList } from "@/entities/index"
export default {
  name: "Board",

  components: {
    List,
    ListComposer
  },

  data() {
    return {
      lists: [ createList("Kek") ],
      listComposing: false
    }
  },

  metods: {
    onListComposingToggle() {},
    onAddList() {}
  }
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