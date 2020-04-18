import Vue from 'vue'
import Router from 'vue-router'
import Board from './views/Board.vue'
import Task from './views/Task.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    // root path -> App.vue
    path: '/',
    // named
    name: 'board',
    // assigned component
    component: Board,
    children: [
      {
        // a path for each task modal
        // the : will pass 'id' as a param
        path: 'task/:id',
        name: 'task',
        component: Task
      }
    ]
  }]
})
