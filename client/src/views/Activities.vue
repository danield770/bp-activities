<script setup>
import { ref, computed, watch } from 'vue';
import { removeDuplicates, capSortedData } from '../util/helper';
import { sortByMonth, prepareData } from '../util/helperV1';
import { useActivityQuery } from '../composables/useActivityQuery';
import MonthlyActivities from '../components/MonthlyActivities.vue';

const activitiesEndpoint = '/activities/v1';
const queryKey = 'activities';

const ITEMS_PER_PAGE = 10;

const { isLoading, isError, isFetching, data, error } = useActivityQuery();

const filter = ref('all');
const searchFilter = ref('');
const page = ref(1);
const hiddenActivities = ref(JSON.parse(localStorage.getItem('hidden')) || []);

const data1 = ref(data);
const dataWithDisplayName = ref(null);
const dataWithHiddenActivities = ref(null);

watch(data1, (newData) => {
  dataWithDisplayName.value = prepareData(newData);
  console.log('newData', [...dataWithDisplayName.value]);
});

const sortedData = computed(() => {
  if (!dataWithDisplayName.value?.length) return [];

  const nonHiddenActivities = dataWithDisplayName.value.filter(
    (activity) => !hiddenActivities.value.includes(activity.id)
  );
  console.log({ nonHiddenActivities });
  const filteredData =
    filter.value === 'all'
      ? nonHiddenActivities
      : nonHiddenActivities.filter(
          (activity) => activity.resource_type === filter.value
        );
  console.log({ filteredData });
  const searchFilteredData =
    searchFilter.value === ''
      ? filteredData
      : filteredData.filter((activity) =>
          activity.displayName
            .toLowerCase()
            .includes(searchFilter.value.toLowerCase())
        );
  console.log({ searchFilteredData });
  const sorted = searchFilteredData.length
    ? sortByMonth(searchFilteredData)
    : [];
  console.log({ sorted });
  return sorted;
});

function hideActivity(id) {
  const updatedHidden = [...hiddenActivities, id];
  localStorage.setItem('hidden', JSON.stringify(updatedHidden));
  setHiddenActivities(updatedHidden);
}
function changeFilter(currentFilter) {
  filter = currentFilter;
}
function filterByActivityName(searchText) {
  searchFilter = searchText;
}
</script>

<template>
  <div class="wpr">
    <span v-if="isLoading">Data is Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <!-- We can assume by this point that `isSuccess === true` -->
    <div v-if="!sortedData.length && searchFilter">
      {{
        `No results for activity name '${searchFilter}' with filter '${filter}'`
      }}
    </div>
    <div v-if="sortedData?.length">
      <ul v-for="(monthData, index) in sortedData" :key="index">
        <MonthlyActivities
          :monthData="monthData"
          :endPoint="activitiesEndpoint"
          :hideActivity="hideActivity"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wpr {
  max-width: 1600px;
  margin: auto;
  color: var(--primary);
}
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
  background-color: #008081;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 6px 6px 0;
  color: white;
}
.search-results {
  position: absolute;
  top: 126px;
  width: 570px;
  max-height: 265px;
  overflow: auto;
  background-color: white;
  border: 1px solid #cbcccd;
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
.modal-wrapper {
  position: fixed;
  inset: 0;
  display: grid;
  place-content: center;
}
.modal-backdrop {
  position: absolute;
  inset: 0;
  /* background: hsl(0deg 0% 0% / 0.5); // uncomment to set a backdrop */
}
.dialog {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 24px;
  height: 300px;
  aspect-ratio: 1.75;
  border: 2px solid #a9aaab;
}
.modal-close {
  color: #a9aaab;
  position: absolute;
  top: 12px;
  right: 12px;
}
.modal-content {
  text-align: center;
  height: 100%;
}
.dialog .activity-img {
  width: 52px;
  height: 52px;
  left: 0;
  right: 0;
  margin: auto;
}
.dialog .activity-name {
  font-size: 1.8rem;
  font-weight: 500;
  margin: 10px 0;
}
.dialog .junior-tag {
  width: 20px;
  height: 20px;
  font-size: 0.8rem;
}
.dialog .activity-date {
  font-size: 1rem;
}
.dialog .comment {
  text-align: left;
  margin-top: 20px;
  font-size: 1.2rem;
}
.dialog .score {
  position: absolute;
  left: 24px;
  bottom: 18px;
  color: #008081;
}
.load-more {
  color: #008081;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.chevron-down {
  display: inline-block;
  vertical-align: top;
}
</style>
