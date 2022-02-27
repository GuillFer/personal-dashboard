<template>
  <div class="event-card">
    <div class="event-date">
      <p>{{ event.date }}</p>
      <p>{{ event.time }}</p>
    </div>
    <h4>{{ event.title }}</h4>
    <h4>{{ event.place }}</h4>
    <div class="actions">
      <i class="fa-solid fa-pen-to-square" @click="editEvent"></i>
      <i class="fa-solid fa-trash-can" @click="deleteEvent"></i>
    </div>
  </div>
</template>

<script>
  import api from '@/services/api.js'

  export default {
    name: 'EventCard',
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    methods: {
      editEvent() {
        this.$store.commit('OPEN_OVERLAY',{
          action: "edit",
          model: "event",
          modelObject: this.event
        })
      },
      deleteEvent() {
        let deleteConfirmed = confirm('Confirmer la suppression')
        if (deleteConfirmed) {
          const event = this.event
          api.deleteEvent(event.id).then(() => {
            this.$store.commit('DELETE_EVENT', event)
            this.postSuccess('Deleted')
          })
        }
      }
    }
  }

</script>

<style scoped>
  .event-card {
    padding: 20px;
    cursor: pointer;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .event-card > h4 {
    flex:3 1 0;
    text-align:left;
  }

  .event-card > h4:nth-of-type(2) {
    flex:2 1 0;
  }

  .event-card > .event-date {
    flex:2 1 0;
    margin-right:8px;
  }

  .event-date > p {
    margin:2px;
    text-align:left;
  }

  .fa-solid {
    margin:0 8px;
  }
</style>
