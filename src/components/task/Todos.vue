<template>
  <div class="widget">
    <h2>To Do</h2>
    <TaskCard v-for="task in tasks" :key="task.id" :task="task"/>
    <p @click="addTask" class="add">Add To Do</p>
    <p @click="toggleDone" class="toggleDone">Toggle done</p>
  </div>
</template>

<script>
import api from '@/services/api.js'
import { watchEffect } from 'vue'
import TaskCard from './TaskCard.vue'

export default {
  components: {
    TaskCard
  },
  data() {
    return {
      tasks: null,
      displayDone: true
    }
  },
  created() {
    // Appel API seulement si VueX ne dispose pas de données
    if (!this.$store.state.tasks.length) {
      watchEffect(() => {
        api.getTasks()
          .then(response => {
            this.tasks = response.data
            this.$store.state.tasks = response.data
          })
          .catch(error => {
            console.log(error)
          })
      })
    } else {
      this.tasks = this.$store.state.tasks
    }
  },
  methods: {
    addTask() {
      this.$store.commit('OPEN_OVERLAY',{
        action: "new",
        model: "task",
        modelObject: null
      })
    },
    toggleDone() {
      this.displayDone = !this.displayDone
      if (this.displayDone) {
        this.tasks = this.$store.state.tasks
      } else {
        this.tasks = this.$store.getters.todos
      }
    }
  }
}
</script>

<style scoped>
  .toggleDone {
    position:absolute;
    top:8px;
    left:8px;
    cursor:pointer;
    color:teal;
  }
</style>
