<template>
  <div class="board">
    <List
      v-for="(list, idx) in lists"
      :key="list.id + idx"
      :list="list"
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
import { isEmpty } from "@/utils/index"
export default {
  name: "Board",

  components: {
    List,
    ListComposer
  },

  data() {
    return {
      lists: [ createList("Kek") ],
      listComposing: false,
      listTitle: ""
    }
  },

  methods: {
    onListComposingToggle() {
      this.listComposing = !this.listComposing;
    },

    onAddList() {
      const { listTitle, lists } = this;
      this.listTitle = "";
      
      return !isEmpty(listTitle) 
          ? lists.push(createList(listTitle))
          : undefined;
    }
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