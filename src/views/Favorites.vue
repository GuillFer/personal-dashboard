<template>
  <div class="favorites">
    <h1>Favoris</h1>

    <form class="favorite-form" @submit.prevent="sendForm" ref="favoriteForm">
      <h3>Ajout rapide</h3>
      <BaseInput
        v-model="favorite.link"
        label="Lien"
        type="text"
      />

      <BaseInput
        v-model="favorite.title"
        label="Titre"
        type="text"
      />

      <BaseInput
        v-model="favorite.description"
        label="Description"
        type="text"
      />

      <BaseDropdown
        :options="favoriteTypes"
        v-model="favorite.favorite_type"
        label="Type"
      />

      <BaseButton type="submit" label="Envoyer"/>
    </form>

    <Favorite v-for="favorite in favorites" :key="favorite.id" :favorite="favorite"/>
  </div>
</template>

<script>
import api from '@/services/favs.js'
import { watchEffect } from 'vue'
import Favorite from '@/components/Favorite.vue'

export default {
  components: {
    Favorite
  },
  data() {
    return {
      favorites: null,
      favorite: {
        title: '',
        link: '',
        description: '',
        order: '',
        favorite_type:''
      },
      favoriteTypes: [
        'website',
        'article',
        'video',
        'audio',
        'profile',
        'forum topic'
      ]
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
    sendForm () {
        const favorite = {
          ...this.favorite
        }
        api.postFavorite(favorite)
          .then((response) => {
            this.$store.commit('ADD_FAVORITE', response.data)
            this.postSuccess('Created')
            this.$refs.favoriteForm.reset()
          })
          .catch((error) => {
            console.log(error)
          })
    },
    postSuccess (postType) {
      this.$store.commit('FLASH', `${postType} !`)
      setTimeout(() => {
        this.$store.commit('FLASH', null)
      }, 5000)
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
