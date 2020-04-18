<template>
  <AppDrop
    @drop="moveTaskOrColumn"
  >
  <AppDrag
    class="column"
    :transferData="{
      type: 'column',
      fromColumnIndex: columnIndex
    }"
  >
  <!-- without AppDrag & AppDrop -->
  <!-- <div class="column"
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    draggable
    @dragstart.self="pickupColumn($event, columnIndex)"
  > -->
    <div class="flex items-center ml-2 mt-2 mb-4 font-bold">
      {{ column.name }}
    </div>
    <div class="list-reset">
      <ColumnTask
        v-for="(task, $taskIndex) of column.tasks"
        :key="$taskIndex"
        :task="task"
        :taskIndex="$taskIndex"
        :column="column"
        :columnIndex="columnIndex"
        :board="board"
      />

      <!-- we pass the $event to get the input value, and the column.tasks to know in which column was the task added -->
      <input type="text" class="block p-2 w-full bg-transparent"
        placeholder="+ New task"
        @keyup.enter="createTask($event, column.tasks)"
      >
    </div>

  <!-- without AppDrag & AppDrop -->
  <!-- </div> -->

  </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from './ColumnTask.vue'
import AppDrag from './AppDrag.vue'
import AppDrop from './AppDrop.vue'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin.js'

export default {
  components: {
    ColumnTask, AppDrag, AppDrop
  },
  mixins: [movingTasksAndColumnsMixin],
  // TO MIXIN
  // props: {
  //   column: {
  //     type: Object,
  //     required: true
  //   },
  //   columnIndex: {
  //     type: Number,
  //     required: true
  //   },
  //   board: {
  //     type: Object,
  //     required: true
  //   }
  // },
  methods: {
    // TO MIXIN
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

    // without AppDrag & AppDrop
    // pickupColumn (e, fromColumnIndex) {
    //   // for the drag&drop to work properly
    //   e.dataTransfer.effectAllowed = 'move'
    //   e.dataTransfer.dropEffect = 'move'

    //   e.dataTransfer.setData('from-column-index', fromColumnIndex)
    //   e.dataTransfer.setData('type', 'column')
    // },
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value
      })
      e.target.value = ''
    }
  }
}
</script>

<style lang="postcss">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
