<template>
  <div class="form-group field">
    <label v-if="label">{{ label }}</label>
    <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)">
      <option :key="option" v-for="option in options" :value="option">{{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .form-group {
    display:flex;
    flex-direction:column;
    justify-content:center;
  }

  select {
    width:80%;
    display:flex;
    align-items:center;
    margin:0 auto 1em!important;
  }

  option {
    text-transform: capitalize;
  }

  label {
    justify-content:center;
    padding-left:8px;
    display:flex;
    align-items:center;
  }
</style>
