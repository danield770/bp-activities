<script setup>
import { ref, computed, watch } from 'vue';
import { removeDuplicates, capSortedData } from '../util/helper';
import { sortByMonth, prepareData } from '../util/helperV1';
import { useActivityQuery } from '../composables/useActivityQuery';
import { activityConfig } from '../config/activities';
import MonthlyActivities from './MonthlyActivities.vue';
import Filters from './Filters.vue';
import Search from './Search.vue';

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

const activityNames = computed(() => {
  if (!dataWithDisplayName.value?.length) return [];

  return removeDuplicates(
    dataWithDisplayName.value.map((activity) => activity.displayName)
  ).sort();
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
  const updatedHidden = [...hiddenActivities.value, id];
  hiddenActivities.value = updatedHidden;
  localStorage.setItem('hidden', JSON.stringify(updatedHidden));
}
function changeFilter(currentFilter) {
  filter.value = currentFilter;
}
function filterByActivityName(searchText) {
  searchFilter.value = searchText;
}
</script>

<template>
  <div>
    <Search
      :activityNames="activityNames"
      @filterByActivityName="filterByActivityName"
    />
    <Filters
      :filters="activityConfig"
      :currentFilter="filter"
      @changeFilter="changeFilter"
    />
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
          @hideActivity="hideActivity"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
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
