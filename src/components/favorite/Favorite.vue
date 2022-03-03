<template>
  <div class="favorite" draggable="true" @dragstart="handleDragStart">
    <div class="link">
      <a :href="favorite.link" target="_blank">{{favorite.title}}</a>
    </div>
    <p class="description">{{favorite.description}}</p>
    <p class="fav-type">{{favorite.favorite_type}}</p>
    <p class="fav-order">{{favorite.order}}</p>
    <slot/>
    <div class="actions">
      <i class="fa-solid fa-pen-to-square" @click="editFavorite"></i>
      <i class="fa-solid fa-trash-can delete-favorite" @click="deleteFavorite"></i>
    </div>
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
    },
    transferData: Object
  },
  setup(props)  {
    const handleDragStart = event => {
      event.dataTransfer.setData('value', JSON.stringify(props.transferData))
    }

    return { handleDragStart }
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
    editFavorite() {
      this.$store.commit('OPEN_OVERLAY',{
          action: "edit",
          model: "favorite",
          modelObject: this.favorite
        })
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

.favorite > .order {
  flex:1 0 0;
}

.favorite > .link {
  flex:2 0 0;
}

.favorite > .description {
  flex:3 0 0;
}

.favorite > .fav-type {
  width:80px;
}

.delete-favorite {
  cursor:pointer;
}

</style>
