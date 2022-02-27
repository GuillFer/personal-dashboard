<template>
  <div class="widget">
    <form @submit.prevent="sendForm" ref="eventForm">

      <h3>Ajout dans l'agenda</h3>

      <BaseInput
        v-model="event.title"
        label="Titre"
        type="text"
      />

      <BaseInput
        v-model="event.comment"
        label="Description"
        type="text"
      />

      <BaseInput
        v-model="event.place"
        label="Lieu"
        type="text"
      />

      <BaseInput
        v-model="event.date"
        label="Date"
        type="text"
      />

      <BaseInput
        v-model="event.time"
        label="Time"
        type="text"
      />

      <BaseButton type="submit" label="Envoyer"/>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
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
      event: {
        id: '',
        title: '',
        comment: '',
        place: '',
        date: '',
        time: ''
      }
    }
  },
  created () {
    if (this.editing) {
      this.event = this.$store.state.overlay.data.modelObject
    }
  },
  methods: {
    sendForm () {
      if (this.editing) {
        const event = this.event
        api.updateEvent(event)
          .then(() => {
            this.$store.commit('UPDATE_EVENT', event)
            this.postSuccess('Edited')
            this.$store.commit('CLOSE_OVERLAY')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        const event = {
          ...this.event,
          id: uuidv4(),
          organizer: this.$store.state.user
        }
        api.postEvent(event)
          .then(() => {
            this.$store.commit('ADD_EVENT', event)
            this.postSuccess('Created')
            this.$refs.eventForm.reset()
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
