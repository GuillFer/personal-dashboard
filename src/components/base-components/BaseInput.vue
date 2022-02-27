<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input
      v-bind="$attrs"
      :placeholder="label"
      class="field"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script>

export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }

  }
}
</script>

<style scoped>
  .form-group {
    display:flex;
    flex-direction:column;
  }

  input {
    margin:0 auto 1em!important;
    width:80%;
  }
</style>
