export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  methods: {
    moveTaskOrColumn (transferData) {
      if (transferData.type === 'task') {
        this.moveTask(transferData)
      } else {
        this.moveColumn(transferData)
      }
    },
    moveTask ({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks: this.column.tasks,
        fromTaskIndex,
        toTaskIndex: this.taskIndex
      })
    },
    moveColumn ({ fromColumnIndex }) {
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      })
    }
    // without AppDrag & AppDrop
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
    // }
  }
}
