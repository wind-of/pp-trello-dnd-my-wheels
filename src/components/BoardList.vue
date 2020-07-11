<template>
  <div class="list-wrapper">
    <div class="list">
      <div class="list-header">
        <p>{{ list.title }}</p>
      </div>
      <div class="list-body">
        <Card
            v-for="(card, idx) in list.cards"
            :key="list.id + card.title + idx"
            :title="card.title"
        />
        <CardComposer 
            v-model="cardTitle"
            :cardComposing="list.cardComposing"
            @card-composing-toggle="$emit('card-composing-toggle', list.id)"
            @add-card="$emit('add-card', list.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/BoardListCard"
import CardComposer from "@/components/BoardListComposerCard"
export default {
  name: "BoardList",

  props: {
    list: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },

  components: {
    Card,
    CardComposer
  }
}
</script>

<style lang="scss">
.list {
  margin: 15px 5px;
  width: 275px;
  border-radius: 3px;
  white-space: normal;
  background: #f4f5f7;
  cursor: default;
  &-header, &-body{
    padding: 10px;
  }
  &-header{
    font-size: 600;
    user-select: text;
  }
}
</style>