<template>
  <div class="favorites">
    <h1>Favoris</h1>
    <FavoriteForm class="favorite-form" />
    <Favorite draggable="true" v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
  </div>
</template>

<script>
import api from '@/services/favs.js'
import { watchEffect } from 'vue'
// import { midString } from '@/utils.js'
import FavoriteForm from '@/components/favorite/FavoriteForm.vue'
import Favorite from '@/components/favorite/Favorite.vue'

export default {
  components: {
    Favorite,
    FavoriteForm
  },
  data() {
    return {
      favorites: null
    }
  },
  methods: {
    getFavorites () {
      api.getFavorites()
        .then(response => {
          this.favorites = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    postSuccess (postType) {
      this.$store.commit('FLASH', `${postType} !`)
      setTimeout(() => {
        this.$store.commit('FLASH', null)
      }, 5000)
    },
    reorder(e) {
      console.log(e)
    }
  },
  created () {
    watchEffect(() => {
      api.getFavorites()
        .then(response => {
          this.favorites = response.data
          this.$store.state.favorites = response.data
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
}
</script>

<style scoped>
.favorite-form {
  display:flex;
  background-color:white;
  margin:16px;
  align-items:center;
  padding:0 16px;
}

:deep(.favorite-form > .form-group) {
  flex-grow:1;
}
</style>
