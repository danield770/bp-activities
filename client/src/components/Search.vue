<script setup>
import { ref, computed } from 'vue';
import VisuallyHidden from './VisuallyHidden.vue';

const emit = defineEmits(['filterByActivityName']);

const props = defineProps({
  activityNames: Array,
});

const searchText = ref('');
const showSuggestions = ref(false);

function resetSearch() {
  emit('filterByActivityName', '');
  searchText.value = '';
  showSuggestions.value = false;
}
function handleSearchFilter(name) {
  console.log('handleSearchFilter ');
  searchText.value = name;
  emit('filterByActivityName', name);
  showSuggestions.value = false;
}

// const hasNoResults = React.useMemo(() => {
//     if (!showSuggestions) return false;

//     // eslint-disable-next-line react/prop-types
//     return activityNames.every(
//       (name) => !name.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [searchText]);

const hasNoResults = computed(() => {
  if (!showSuggestions.value) return false;

  return props.activityNames.every(
    (name) => !name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});

//   const searchResults = React.useMemo(() => {
//     if (!showSuggestions) return [];

//     // eslint-disable-next-line react/prop-types
//     return activityNames.filter((name) =>
//       name.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [searchText, showSuggestions]);
const searchResults = computed(() => {
  if (!showSuggestions.value) return [];
  return props.activityNames.filter((name) =>
    name.toLowerCase().includes(searchText.value.toLowerCase())
  );
});
</script>

<template>
  <div>
    <div class="search-wpr">
      <input
        v-model="searchText"
        type="text"
        placeholder="Search Timeline"
        v-on:focus="showSuggestions = true"
        v-on:blur="showSuggestions = false"
        class="search-input"
      />

      <button
        v-show="searchText"
        type="button"
        class="reset-btn"
        @click="resetSearch"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="28"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"
          ></path>
        </svg>

        <VisuallyHidden class="visually-hidden">Reset Search</VisuallyHidden>
      </button>

      <button
        type="button"
        class="search-btn"
        @click="emit('filterByActivityName', searchText)"
        :disabled="!searchText || hasNoResults"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 512 512"
          height="28"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"
          ></path>
        </svg>
        <VisuallyHidden class="visually-hidden"
          >Search Activities</VisuallyHidden
        >
      </button>
    </div>

    <div v-if="hasNoResults" class="no-results">No results found</div>

    <ul v-else class="search-results">
      <li v-for="name in searchResults" :key="name">
        <button class="search-result" @mousedown="handleSearchFilter(name)">
          {{ name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-wpr {
  display: flex;
  width: 570px;
  height: 50px;
  margin: 26px 0;
  position: relative;
}
.search-input {
  flex: 1;
  border: 1px solid #cbcccd;
  border-right: 0;
  border-radius: 6px 0 0 6px;
  padding: 0 8px;
}
.search-input:focus {
  display: block;
  border-radius: 6px 0 0 0;
  outline: 0;
}
.search-input:focus-visible {
  box-shadow: inset 0 0 1px 1px currentColor;
}
.search-wpr:focus-within + .search-results {
  display: block;
}
.reset-btn {
  background: none;
  position: absolute;
  right: 50px;
  top: 12px;
}
.search-btn.search-btn {
  width: 48px;
  background-color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 6px 6px 0;
  color: white;
}
.search-results {
  position: absolute;
  top: 158px;
  width: 570px;
  max-height: 265px;
  overflow: auto;
  background-color: white;
  border: 1px solid var(--borderColor);
  display: none;
  z-index: 1;
}
.search-result {
  padding: 0 8px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.search-input::placeholder {
  font-weight: 500;
}
.no-results {
  color: red;
  position: relative;
  top: -20px;
}
.visually-hidden {
  display: inline-block;
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
}
</style>
