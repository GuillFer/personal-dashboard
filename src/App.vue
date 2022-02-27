<template>
  <Nav />
  <router-view />
  <Overlay
    v-if="overlayOpen"
    v-bind:editing="editing"
  />
  <div id="flash" v-if="flashMessage">{{ flashMessage }}</div>
</template>

<script>
import Nav from './components/Nav'
import Overlay from './components/Overlay'

export default {
  components: {
    Nav,
    Overlay
  },
  computed: {
    flashMessage () {
      return this.$store.state.flashMessage
    },
    overlayOpen() {
      return this.$store.state.overlay.open
    },
    overlayData() {
      return this.$store.state.overlay.data
    },
    editing() {
      return this.$store.state.overlay.data.action == "edit"
    }
  },
  created () {
  }

}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600&display=swap');
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image:url('assets/bg2.jpg');
  min-height:100vh;
  font-family:'Space Grotesk';
}

body {
  margin:0;
}

h2 {
  font-weight:600;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration:none;
}

#nav a.router-link-exact-active {
  color: white;
  text-decoration:underline;
}


#flash {
  position: fixed;
  top: 16px;
  left: 16px;
  color:white;
  background-color:green;
  padding: 4px;
  border-radius: 8px;
  animation-name: fade;
  animation-duration: 5s;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
