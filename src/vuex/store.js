import { createStore } from "vuex";

export default createStore({
  state: {
    events: [],
    tasks : [],
    favorites: [],
    cityWeather: "Nantes",
    weather: null,
    overlay: {
      open: false,
      data: {}
    },
    flashMessage: null
  },
  mutations: {
    FLASH(state, message) {
      state.flashMessage = message
      setTimeout(() => {
        state.flashMessage = ''
      }, 5000)
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    UPDATE_EVENT(state, event) {
      const index = state.events.indexOf(event)
      state.events[index] = event
    },
    DELETE_EVENT(state, event) {
      const index = state.events.indexOf(event)
      state.tasks.splice(index, 1)
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    UPDATE_TASK(state, task) {
      const index = state.tasks.indexOf(task)
      state.tasks[index] = task
    },
    DELETE_TASK(state, task) {
      const index = state.tasks.indexOf(task)
      state.tasks.splice(index, 1)
    },
    ADD_FAVORITE(state, favorite) {
      state.favorites.push(favorite)
    },
    UPDATE_FAVORITE(state, favorite) {
      const index = state.favorites.indexOf(favorite)
      state.favorites[index] = favorite
    },
    DELETE_FAVORITE(state, favorite) {
      const index = state.favorites.indexOf(favorite)
      state.favorites.splice(index, 1)
    },
    OPEN_OVERLAY(state, data) {
      state.overlay.open = true
      state.overlay.data = data
    },
    CLOSE_OVERLAY(state) {
      state.overlay.open = false
    }
  },
  getters: {
    todos(state) {
      return state.tasks.filter(t => t.done == false)
    },
    getEventById(state, id) {
      return state.events.find(e => e.id == id)
    }
  },
  modules: {},
});
