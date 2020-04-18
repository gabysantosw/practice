<template>
  <div
    draggable
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    // information to transfer
    transferData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onDrag (e) {
      // for the drag&drop to work properly
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    }
  }
}
</script>

<style>

</style>
