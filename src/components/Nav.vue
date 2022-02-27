<template>
  <div id="nav">
    <router-link v-if="!user" to="/">Home</router-link>
    <router-link v-if="user" :to="{ name: 'Dashboard' }">Dashboard</router-link>
    <router-link :to="{ name: 'About' }">About</router-link>
    <router-link :to="{ name: 'Favorites' }">Favorites</router-link>
    <BaseButton v-if="user" label="Logout" class="log-in-out" @click="logout"/>
  </div>
</template>

<script>

export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  #nav {
    display: flex;
    justify-content: center;
    background-color:rgba(0,0,0,0.1);
    margin-bottom:32px;
  }

  #nav > a {
    margin:0 16px;
    display:flex;
    align-items:center;
  }

  .log-in-out {
    position: absolute;
    right: 16px;
    top:16px;
    margin-top:0;
  }
</style>
