<template>
  <div class="list-wrapper">
    <div class="list">
      <div class="list-header">
        <p>Kek</p>
      </div>
      <div class="list-body">
        aoaoaoaoaooaoaoaooa
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BoardList"
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