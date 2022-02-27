<template>
  <div class="favorite">
    <div class="link">
      <a :href="favorite.link" target="_blank">{{favorite.title}}</a>
    </div>
    <p class="description">{{favorite.description}}</p>
    <div class="delete-favorite" @click="deleteFavorite">&#10060;</div>
  </div>
</template>

<script>
import api from '@/services/favs.js'

export default {
  name: 'Favorite',
  props: {
    favorite: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteFavorite() {
      let deleteConfirmed = confirm('Confirmer la suppression')
      if (deleteConfirmed) {
        const favorite = this.favorite
        api.deleteFavorite(favorite.id).then(() => {
          this.$store.commit('DELETE_FAVORITE', favorite)
          this.postSuccess('Deleted')
        })
      }
    },
    postSuccess (postType) {
      this.$store.commit('FLASH', `${postType} !`)
      setTimeout(() => {
        this.$store.commit('FLASH', null)
      }, 5000)
    }
  },
  created() {
  }
}
</script>

<style scoped>
.favorite {
  display:flex;
  background-color:white;
  align-items:center;
  margin:4px 16px;
  position:relative;
}

.favorite > * {
  margin:8px 16px;
  text-align:left;
}

.favorite > .link {
  flex:1 1 0;
}

.favorite > .description {
  flex:2 1 0;
}

.delete-favorite {
  cursor:pointer;
}

</style>
