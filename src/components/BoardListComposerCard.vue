<template>
  <div :class="[{'add-mod': cardComposing}, 'card-composer']" >
    <template v-if="!cardComposing">
      <p @click="$emit('card-composing-toggle')">
        + Add another card
      </p>
    </template>
    <template v-else>
      <textarea 
          placeholder="Enter a title for this card..." 
          v-model="cardTitle">
      </textarea>
      <div class="add-card-controls">
        <button @click="$emit('add-card')">Add List</button>
        <i @click="$emit('card-composing-toggle')">X</i>
      </div>
    </template>
  </div>
</template>

<script>
import { createPropModel } from "@/helpers/prop.model"
export default {
  name: "BoardListCardComposer",

  props: {
    cardComposing: {
      type: Boolean,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    cardTitle: createPropModel()
  }
}
</script>

<style lang="scss">
.card-composer{
  p{
    padding: 10px;
    cursor: pointer;
    &:hover{
      background-color: rgba(9, 30, 66, .08);
    }
  }
  textarea{
    width: 245px;
    height: 75px;
    font-size: 15px;
  }
  .add-card-controls{
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
}
</style>