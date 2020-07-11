<template>
  <div class="list-composer-wrapper">
    <div :class="[{'add-mod': listComposing}, 'list-composer']">
      <template v-if="!listComposing">
        <p @click="$emit('list-composing-toggle')">
          + Add another list
        </p>
      </template>
      <template v-else>
        <input 
            type="text" 
            placeholder="Enter list title..."
            v-model="listTitle"
        >
        <div class="add-list-controls">
          <button @click="$emit('add-list')">Add List</button>
          <i @click="$emit('list-composing-toggle')">X</i>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { createPropModel } from "@/helpers/prop-model"
export default {
  name: "ListComposer",

  props: {
    listComposing: {
      type: Boolean,
      required: true
    },
    value: {
      required: true,
      type: String
    }
  },

  computed: {
    listTitle: createPropModel()
  }
}
</script>

<style lang="scss">
.list-composer-wrapper{
  width: 275px;
  margin: 15px 5px;
}
.list-composer{
  p{
    background: rgba(255, 255, 255, .32);
    padding: 10px;
    border-radius: 3px;
    transition: .1s;
    color: white;
    cursor: pointer;
    &:hover{
      background: rgba(255, 255, 255, .45)
    }
  }
  input{
    width: 246px;
    margin-bottom: 2px;
    font-size: 15px;
    padding: 8px;
  }
  .add-list-controls{
    margin-top: 2px;
    width: inherit;
    display: flex;
    align-items: center;
    button, i{
      cursor: pointer;
    }
    button{
      margin-right: 6px;
    }
    i{
      margin-left: 6px;
      font-size: 18px;
    }
  }
  &.add-mod{
    background: #ebecf0;
    padding: 5px;
  }
}
</style>