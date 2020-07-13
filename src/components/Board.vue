<template>
  <div class="board">
    <List
        v-for="(list, idx) in lists"
        v-model="cardTitle"
        :key="list.id + idx"
        :list="list"
        @card-composing-toggle="onCardComposingToggle"
        @add-card="onAddCard"
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
import { createList, createCard } from "@/entities/index"
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
      listTitle: "",
      cardTitle: ""
    }
  },

  methods: {
    onListComposingToggle() {
      this.listComposing = !this.listComposing;
    },

    onCardComposingToggle(listId) {
      const list = this.lists.find(({id}) => id === listId);

      if(!this.cardComposingList) {
        this.cardComposingList = list;
      }
      else if(this.cardComposingList.id === listId) {
        this.cardTitle = "";
      }
      else {
        this.cardComposingList.cardComposing = false;
        this.cardComposingList = list;
      }

      return list.cardComposing = !list.cardComposing;
    },

    onAddCard(listId) {
      const { cardTitle } = this;
      const list = this.lists.find(({id}) => id === listId);
      this.cardTitle = "";

      return !isEmpty(cardTitle) 
          ? list.cards.push(createCard(cardTitle))
          : undefined
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