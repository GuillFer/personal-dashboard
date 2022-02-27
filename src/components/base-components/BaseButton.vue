<template>
  <button>{{label}}</button>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      default: "Submit"
    }
  }
};
</script>

<style scoped>

button {
  width: max-content;
  margin: 16px auto;
  padding: 8px 16px;
  background-color: seagreen;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  align-self: end;
}

</style>
