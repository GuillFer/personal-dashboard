import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  origin: 'http://localhost:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents () {
    return apiClient.get(`/api/v1/events/`)
  },
  getEvent(eventId) {
    return apiClient.get(`/api/v1/events/${eventId}`)
  },
  updateEvent(event) {
    return apiClient.put(`/api/v1/events/${event.id}`, event)
  },
  postEvent(event) {
    return apiClient.post(`/api/v1/events`, event)
  },
  deleteEvent(eventId) {
    return apiClient.delete(`/api/v1/events/${eventId}`)
  },
  getTasks() {
    return apiClient.get(`/api/v1/tasks/`)
  },
  getTask(taskId) {
    return apiClient.get(`/api/v1/tasks/${taskId}`)
  },
  updateTask(task) {
    return apiClient.put(`/api/v1/tasks/${task.id}`, task)
  },
  postTask(task) {
    return apiClient.post(`/api/v1/tasks`, task)
  },
  deleteTask(taskId) {
    return apiClient.delete(`/api/v1/tasks/${taskId}`)
  }
}
