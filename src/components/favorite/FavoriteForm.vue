<template>
    <form @submit.prevent="sendForm" ref="favoriteForm">

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

      <BaseInput
        v-model="favorite.order"
        label="Ordre"
        type="text"
      />

      <BaseButton type="submit" label="Envoyer"/>
    </form>
</template>

<script>
import api from '@/services/favs.js'

export default {
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
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
  created () {
    if (this.editing) {
      this.favorite = this.$store.state.overlay.data.modelObject
    }
  },
  methods: {
    sendForm () {
      if (this.editing) {
        const favorite = this.favorite
        api.updateFavorite(favorite)
          .then(() => {
            this.$store.commit('UPDATE_FAVORITE', favorite)
            this.postSuccess('Edited')
            this.$store.commit('CLOSE_OVERLAY')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        const favorite = {...this.favorite}
        api.postFavorite(favorite)
          .then(() => {
            console.log('add favorite')
            this.$store.commit('ADD_FAVORITE', favorite)
            this.postSuccess('Created')
            this.$refs.favoriteForm.reset()
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
  .favorite-overlay {
    background-color:white;
    padding:16px;
    margin:auto;
    width:66%;
    height:max-content;
  }
</style>
