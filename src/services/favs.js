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
  getFavorites() {
    return apiClient.get(`/api/v1/favorites/`)
  },
  updateFavorite(favorite) {
    return apiClient.put(`/api/v1/favorites/${favorite.id}`, favorite)
  },
  postFavorite(favorite) {
    return apiClient.post(`/api/v1/favorites`, favorite)
  },
  deleteFavorite(favoriteId) {
    return apiClient.delete(`/api/v1/favorites/${favoriteId}`)
  }
}
