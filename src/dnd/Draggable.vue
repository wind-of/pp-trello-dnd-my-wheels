<template>
  <div 
      ref="draggable" 
      :style="draggableStyle"
      :class="className"
      @dragstart="() => false"
      @mousedown="onMouseDown">
    <slot/>
  </div>
</template>

<script>
import { height, width, elementNearestThePoint, findIndex } from "@/dnd/utils"
import { findNearestElementsBySelector } from "@/helpers/find-nearest"
export default {
  name: "Draggable",

  props: {
    className: {
      type: String,
      required: false,
      default: "draggable"
    },
    placeholderClassName: {
      type: String,
      required: false,
      default: "placeholder"
    },
    siblingsSelector: {
      type: String,
      required: false,
      default: ".draggable"
    },
    stepsBeforeDragStart: {
      type: Number,
      required: false,
      default: 30
    },
    dropTo: {
      type: String,
      required: true,
      default: "*"
    },
  },

  data() {
    return {
      draggable: null,
      placeholder: null,
      draggableStyle: {
        left: 0,
        top: 0,
      },
      droppableOptions: {
        droppableAreaIndex: null,
        insertBeforeChildByIndex: null,
      },

      shiftX: 0,
      shiftY: 0,

      initialPoint: {
        x: 0,
        y: 0,
        taken: 0
      },
    }
  },

  methods: {
    onMouseDown({ pageX, pageY }) {
      this.initialPoint.x = pageX;
      this.initialPoint.y = pageY;

      this.setShifts(pageX, pageY);
      document.addEventListener("mousemove", this.onMouseMove);
    },

    onMouseMove(event) {
      const { initialPoint, stepsBeforeDragStart } = this;
      const { pageX, pageY } = event;

      if(initialPoint.taken < stepsBeforeDragStart) {
        initialPoint.taken = Math.abs(pageX + pageY - (initialPoint.x + initialPoint.y));
        if(initialPoint.taken < stepsBeforeDragStart) return undefined;
        this.draggingModON();
      }
      this.moveDraggableAt(pageX, pageY);

      // const potentialDroppables = new Array(...document.querySelectorAll(this.dropTo));
      // const droppable = this.getNearestDroppable(pageX, pageY);
      // if(!droppable) return;
      
      // this.droppableOptions.droppableAreaIndex = potentialDroppables.indexOf(droppable);

      // const droppableChildren = new Array(...droppable.childNodes);
      // const isSiblingOfDraggable = element => element.matches(this.siblingsSelector) || element.matches(this.placeholderClassName);
      // const siblingsOfDraggable = droppableChildren.filter(isSiblingOfDraggable);
      
      // if(siblingsOfDraggable.length === 0) 
      //   return this.droppableOptions.insertBeforeChildByIndex = 0;

      // const nearestSibling = elementNearestThePoint(siblingsOfDraggable, pageX, pageY, "y");
      // console.log(nearestSibling, siblingsOfDraggable.indexOf(nearestSibling));
      // this.droppableOptions.insertBeforeChildByIndex = siblingsOfDraggable.indexOf(nearestSibling);
    },

    draggingModON() {
      this.insertPlaceholder();
      this.$set(this.draggableStyle, "position", "absolute");

      document.body.appendChild(this.draggable);
      document.addEventListener("mouseup", this.draggingModOFF);
    },

    draggingModOFF() {
      this.removePlaceholder();
      this.$set(this, "draggableStyle", { top: 0, left: 0 });
      this.draggable.removeAttribute("style");
      this.initialPoint.taken = 0;

      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mousedown", this.onMouseDown);
      document.removeEventListener("mouseup", this.draggingModOFF);
    },

    insertPlaceholder() {
      if(this.placeholder) return undefined;
      this.createPlaceholder();
      this.draggable.parentNode.insertBefore(this.placeholder, this.draggable);
    },
    createPlaceholder() {
      this.placeholder = document.createElement("div");
      this.placeholder.classList.add(this.placeholderClassName);
      this.placeholder.style.height = height(this.draggable)
      this.placeholder.style.width = width(this.draggable)
    },
    removePlaceholder() {
      this.placeholder.parentNode.insertBefore(this.draggable, this.placeholder)
      this.placeholder.remove();
      this.placeholder = null;
    },

    setShifts(x, y) {
      const { left, top } = this.draggable.getBoundingClientRect();
      this.shiftX = x - left;
      this.shiftY = y - top;
    },

    moveDraggableAt(x, y) {
      this.draggableStyle.left = x - this.shiftX + "px"
      this.draggableStyle.top = y - this.shiftY + "px"
    },

    getNearestDroppable(x, y) {
      const elementBelow = this.getElementBelow(x, y);
      const walkOnTheTreeAndGetMeNearestDroppableAreaPlease = () => elementNearestThePoint(findNearestElementsBySelector(elementBelow, this.dropTo), x, y);
      return elementBelow 
          ? elementBelow.closest(this.dropTo) || walkOnTheTreeAndGetMeNearestDroppableAreaPlease()
          : undefined
    },

    getElementBelow(x, y) {
      this.draggable.hidden = true;
      const elementBelow = document.elementFromPoint(x, y);
      this.draggable.hidden = false;

      return elementBelow
    }
  },

  mounted() {
    this.draggable = this.$refs.draggable;
  }
}
</script>