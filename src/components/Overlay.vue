<template>
  <div id="overlay">
    <div class="overlay-close" @click="closeOverlay">╳</div>
    <EventForm v-if="overlayData.model === 'event'" v-bind:editing="editing" />
    <TaskForm v-if="overlayData.model === 'task'" v-bind:editing="editing" />
    <FavoriteForm v-if="overlayData.model === 'favorite'" v-bind:editing="editing" class="favorite-overlay"/>
  </div>
</template>

<script>
import TaskForm from './task/TaskForm'
import EventForm from './event/EventForm'
import FavoriteForm from './favorite/FavoriteForm'

export default {
  name: 'Overlay',
  components: {
    TaskForm,
    EventForm,
    FavoriteForm
  },
  props: {
    editing:Boolean
  },
  computed: {
    overlayData() {
      return this.$store.state.overlay.data
    }
  },
  methods: {
    closeOverlay() {
      this.$store.state.overlay.open = false
    }
  }
}
</script>

<style scoped>
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.4);
  width: 100%;
  height: 100vh;
  padding-top: 10vh;
}

.overlay-close {
  position:absolute;
  top:24px;
  right:24px;
  color:white;
  width:max-content;
  cursor:pointer;
}

#overlay > div:not(.overlay-close) {
  margin: auto;
  background-color: white;
  width:66%;
  height:max-content;
  padding:16px;
}

input {
  max-width:80%!important;
}

</style>
