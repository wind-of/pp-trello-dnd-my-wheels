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
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/BoardListCard"
export default {
  name: "BoardList",

  props: {
    list: {
      required: true,
      type: Object
    }
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