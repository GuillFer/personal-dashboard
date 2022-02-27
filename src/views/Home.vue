<template>
  <div class="home">
    <Weather v-if="user" />
    <Todos />
    <Events />
  </div>
</template>

<script>
// @ is an alias to /src
import Weather from "@/components/Weather.vue";
import Todos from "@/components/task/Todos.vue";
import Events from "@/components/event/Events.vue";

export default {
  name: "Home",
  components: {
    Events,
    Todos,
    Weather
  },
};
</script>

<style scoped>
  .home {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding:8px 32px;
  }

  .home > div.widget {
    width: 45%;
    margin: 8px;
    padding: 12px;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    box-shadow: 4px 4px 4px rgba(0,0,0,0.2);
    border: 1px solid rgba(0,0,0,0.4);
    position:relative;
    flex-grow:1;
  }

  :deep(div.widget > div) {
    border: 1px solid lightgrey;
    border-radius: 4px;
    padding: 16px 8px 8px;
    position: relative;
  }

  :deep(div.widget > div > .delete) {
    position: absolute;
    top: 4px;
    right: 4px;
    font-size: 0.5em;
    cursor: pointer;
  }

  :deep(h4), :deep(h3) {
    margin:8px 0;
  }

  :deep(.add) {
    cursor:pointer;
    position: absolute;
    top: 8px;
    right: 8px;
    color: teal;
  }

</style>
