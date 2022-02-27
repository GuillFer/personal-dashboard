<template>
  <h1>Not Found</h1>
  <h3>This {{ resource }} doesn't exist</h3>
  <router-link :to="{ name: 'Home' }">Back to Homepage</router-link>
</template>

<script>

export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  }
}
</script>
