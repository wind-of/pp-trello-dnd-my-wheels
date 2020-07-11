<template>
  <div class="card">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  name: "BoardListCard",

  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.card-placeholder, .card{
  width: 235px;
  border-radius: 3px;
  margin: 0 0 8px;
}
.card-placeholder{
  background: rgba(9, 30, 65, .2);
}
.card{
  padding: 10px;
  background: white;
  box-shadow: 0 1px 0 rgba(9, 30, 65, .25);
  cursor: pointer;
}
</style>