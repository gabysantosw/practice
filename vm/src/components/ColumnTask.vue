<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
  <AppDrag
    class="task"
    @click.native="goToTask(task)"
    :transferData="{
      type: 'task',
      fromColumnIndex: columnIndex,
      fromTaskIndex: taskIndex
    }"
  >
  <!-- without AppDrag & AppDrop -->
  <!-- <div class="task"
    @click="goToTask(task)"
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
  > -->

    <span class="w-full flex-no-shrink font-bold">
      {{ task.name }}
    </span>
    <p class="w-full flex-no-shrink mt-2 text-sm" v-if="task.description">
      {{ task.description }}
    </p>

  <!-- without AppDrag & AppDrop -->
  <!-- </div> -->

  </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin.js'

export default {
  components: {
    AppDrag, AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true
    },
    taskIndex: {
      type: Number,
      required: true
    }
    // FROM MIXIN
    // column: {
    //   type: Object,
    //   required: true
    // },
    // columnIndex: {
    //   type: Number,
    //   required: true
    // },
    // board: {
    //   type: Object,
    //   required: true
    // }
  },
  methods: {
    // FROM MIXIN
    // moveTaskOrColumn (e, toTasks, toColumnIndex, toTaskIndex) {
    //   const type = e.dataTransfer.getData('type')

    //   if (type === 'task') {
    //     this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
    //   } else {
    //     this.moveColumn(e, toColumnIndex)
    //   }
    // },
    // moveTask (e, toTasks, toTaskIndex) {
    //   const fromColumnIndex = e.dataTransfer.getData('from-column-index')
    //   const fromTasks = this.board.columns[fromColumnIndex].tasks
    //   const fromTaskIndex = e.dataTransfer.getData('from-task-index')

    //   this.$store.commit('MOVE_TASK', {
    //     fromTasks,
    //     toTasks,
    //     fromTaskIndex,
    //     toTaskIndex
    //   })
    // },
    // moveColumn (e, toColumnIndex) {
    //   const fromColumnIndex = e.dataTransfer.getData('from-column-index')

    //   this.$store.commit('MOVE_COLUMN', {
    //     fromColumnIndex,
    //     toColumnIndex
    //   })
    // },
    goToTask (task) {
      this.$router.push({
        name: 'task',
        params: { id: task.id }
      })
    }
    // without AppDrag & AppDrog
    // pickupTask (e, taskIndex, fromColumnIndex) {
    //   // for the drag&drop to work properly
    //   e.dataTransfer.effectAllowed = 'move'
    //   e.dataTransfer.dropEffect = 'move'

    //   e.dataTransfer.setData('from-task-index', taskIndex)
    //   e.dataTransfer.setData('from-column-index', fromColumnIndex)
    //   e.dataTransfer.setData('type', 'task')
    // }
  }
}
</script>

<style>

</style>
