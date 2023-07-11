<script setup>
import { ref } from 'vue';
const emit = defineEmits(['changeFilter']);

const props = defineProps({
  filters: Object,
  currentFilter: String,
});
const value = ref(props.currentFilter);
</script>

<template>
  <div>
    <div>Filter by:</div>
    <ol class="filters">
      <li class="filter" key="all" @click="emit('changeFilter', 'all')">
        <input
          type="radio"
          name="radio-filter"
          id="radio-all"
          value="all"
          v-model="value"
        />

        <label for="radio-all">
          <svg
            v-show="value === 'all'"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            class="icon-visual"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
            ></path>
          </svg>
          All Work
        </label>
      </li>

      <li
        v-for="filter in Object.keys(props.filters)"
        :key="filter"
        class="filter"
        @click="emit('changeFilter', filter)"
      >
        <input
          type="radio"
          name="radio-filter"
          :id="`radio-${filter}`"
          :value="filter"
          v-model="value"
        />
        <label :for="`radio-${filter}`">
          <svg
            v-show="value === filter"
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            class="icon-visual"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
            ></path>
          </svg>
          {{ props.filters[filter]?.name }}
        </label>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  color: #008081;
  gap: 12px;
  min-height: 85px;
  align-items: center;
  margin-bottom: 15px;
  font-weight: 500;
}
.filter {
  height: 40px;
  display: flex;
}
.filter input {
  width: 0;
  height: 0;
}
.filter label {
  padding: 10px 15px;
  border: 2px solid;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
input:checked + label {
  background-color: #ecfdfd;
}
.icon-visual {
  display: inline-block;
  margin-right: 4px;
}
input:focus-visible + label {
  /* remove default focus style */
  outline: none;
  /* custom focus styles */
  box-shadow: 0 0 1px 1px currentColor;
}
</style>
