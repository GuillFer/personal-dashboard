<template>
  <div class="task-card" :class="{done : done}">
    <span>{{ task.date }}</span>
    <h4>{{ task.title }}</h4>
    <div :class="{isDone : done}" class="mark-done" @click="markAsDone">&#10004;</div>
    <div class="delete" @click="deleteTask">&#10060;</div>
    <i class="fa-solid fa-pen-to-square" @click="editTask"></i>
  </div>
</template>

<script>
import api from '@/services/api.js'
  export default {
    name: 'TaskCard',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    methods: {
      markAsDone() {
        console.log('done!')
        const task = this.task
        task.done = !task.done
        api.updateTask(task).then((response) => {
          console.log(response)
          this.$store.commit('UPDATE_TASK', task)
        })
      },
      editTask() {
        this.$store.commit('OPEN_OVERLAY', {
          action: "edit",
          model: "task",
          modelObject: this.task
        })
      },
      deleteTask() {
        let deleteConfirmed = confirm('Confirmer la suppression')
        if (deleteConfirmed) {
          const task = this.task
          api.deleteTask(task.id).then(() => {
            this.$store.commit('DELETE_TASK', task)
            this.postSuccess('Deleted')
          })
        }
      },
      postSuccess (postType) {
        this.$store.commit('FLASH', `${postType} !`)
        setTimeout(() => {
          this.$store.commit('FLASH', null)
        }, 5000)
      }
    },
    computed: {
      done() {
        return this.task.done
      }
    }
  }
</script>

<style scoped>

  .task-card, .task-card > * {
    transition:0.5s;
  }

  .task-card {
    margin-bottom: 8px;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }

  .task-card.done {
    background-color: rgba(0,0,0,0.1);
    color: rgba(0,0,0,0.2);
  }

  .task-card > .mark-done {
    cursor:pointer;
    border: 1px solid rgba(0,0,0,0.4);
    color:white;
    line-height:1;
  }

  .task-card > .isDone {
    cursor:pointer;
    border: 1px solid rgba(0,0,0,0.2);
    background-color: rgba(0,0,0,0.2);
  }

  .fa-pen-to-square {
    position:absolute;
    cursor:pointer;
    top:4px;
    left:4px;
    font-size:0.75em;
  }


</style>
