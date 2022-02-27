<template>
  <div class="widget">
    <form @submit.prevent="sendForm" ref="taskForm">

      <h3>Ajout dans la To Do List</h3>

      <BaseInput
        v-model="task.title"
        label="Titre"
        type="text"
      />

      <BaseInput
        v-model="task.comment"
        label="Description"
        type="text"
      />

      <BaseInput
        v-model="task.deadline"
        label="Deadline"
        type="text"
      />

      <BaseButton type="submit" label="Envoyer"/>
    </form>
  </div>
</template>

<script>

import api from '@/services/api.js'

export default {
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      task: {
        title: '',
        comment: '',
        deadline: ''
      }
    }
  },
  created () {
    if (this.editing) {
      this.task = this.$store.state.overlay.data.modelObject
    }
  },
  methods: {
    sendForm () {
      if (this.editing) {
        const task = this.task
        api.updateTask(task)
          .then(() => {
            this.$store.commit('UPDATE_TASK', task)
            this.postSuccess('Edited')
            this.$store.commit('CLOSE_OVERLAY')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        const task = {
          ...this.task
        }
        api.postTask(task)
          .then((response) => {
            this.$store.commit('ADD_TASK', response.data)
            this.postSuccess('Created')
            this.$refs.taskForm.reset()
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    postSuccess (postType) {
      this.$store.commit('FLASH', `${postType} !`)
      setTimeout(() => {
        this.$store.commit('FLASH', null)
      }, 5000)
    }
  }
}
</script>

<style scoped>

</style>
