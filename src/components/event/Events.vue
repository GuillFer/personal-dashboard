<template>
  <div class="widget">
    <h2>Agenda</h2>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <p @click="addEvent" class="add">Add Event</p>
  </div>
</template>

<script>
import api from '@/services/api.js'
import { watchEffect } from 'vue'
import EventCard from './EventCard.vue'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: null
    }
  },
  methods: {
    getEvents () {
      api.getEvents()
        .then(response => {
          this.events = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addEvent() {
      this.$store.commit('OPEN_OVERLAY',{
        action: "new",
        model: "event",
        modelObject: null
      })
    }
  },
  created () {
    watchEffect(() => {
      api.getEvents()
        .then(response => {
          this.events = response.data
          this.events.forEach(event => {
            event.date = new Date(event.date).toLocaleDateString()
          })
          this.$store.state.events = response.data
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}
</script>

<style scoped>

</style>
