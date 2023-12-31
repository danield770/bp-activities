<script setup>
import { ref, computed, watch } from 'vue';
import { removeDuplicates, capSortedData } from '../util/helper';
import {
  sortByMonthV2,
  prepareDataV2,
  getDisplayNames,
  getActivityById,
  removeHiddenIds,
} from '../util/helperV2';
import { useActivityQuery } from '../composables/useActivityQuery';
import { activityConfig } from '../config/activities';
import MonthlyActivities from './MonthlyActivities.vue';
import Filters from './Filters.vue';
import Search from './Search.vue';
import Zoom from './Zoom.vue';

const activitiesEndpoint = '/activities/v2';
const queryKey = 'activities';
const ITEMS_PER_PAGE = 10; /* Change this value to test the load more logic */

const key = ref(window.location.hash.split('/').slice(-1)[0]);

const { isLoading, isError, isFetching, data, error } = useActivityQuery(
  activitiesEndpoint,
  queryKey
);

const filter = ref('all');
const searchFilter = ref('');
const page = ref(1);
const hiddenActivities = ref(JSON.parse(localStorage.getItem('hidden')) || []);

const data1 = ref(data);
const dataWithDisplayName = ref(null);
const total_items = ref(0);

watch(data1, (newData) => {
  dataWithDisplayName.value = prepareDataV2(newData);
  console.log('newData', [...dataWithDisplayName.value]);
});

const activityNames = computed(() => {
  if (!dataWithDisplayName.value?.length) return [];

  return removeDuplicates(getDisplayNames(dataWithDisplayName.value)).sort();
});

const cappedSortedData = computed(() => {
  if (!dataWithDisplayName.value?.length) return [];

  const nonHiddenActivities = removeHiddenIds(
    dataWithDisplayName.value,
    hiddenActivities.value
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
      : filteredData.map((type) => ({
          ...type,
          activities: type.activities.filter((activity) =>
            activity.displayName
              .toLowerCase()
              .includes(searchFilter.value.toLowerCase())
          ),
        }));
  console.log({ searchFilteredData });
  const sortedData = searchFilteredData.some((type) => type.activities.length)
    ? sortByMonthV2(searchFilteredData)
    : [];
  //   console.log({ sortedData });

  total_items.value = sortedData.length
    ? sortedData.reduce((acc, item) => acc + item.length, 0)
    : 0;
  const numItemsToDisplay = Math.min(
    total_items.value,
    page.value * ITEMS_PER_PAGE
  );
  return capSortedData(sortedData, numItemsToDisplay);
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
function closeZoom() {
  key.value = '';
}
function openZoom(id) {
  key.value = id;
}
console.log({ key });
</script>

<template>
  <div>
    <div class="wpr">
      <h1 class="heading">Timeline</h1>
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
      <div v-if="!cappedSortedData.length && searchFilter">
        {{
          `No results for activity name '${searchFilter}' with filter '${filter}'`
        }}
      </div>
      <div v-if="cappedSortedData?.length">
        <ul v-for="(monthData, index) in cappedSortedData" :key="index">
          <MonthlyActivities
            :monthData="monthData"
            :endPoint="activitiesEndpoint"
            @hideActivity="hideActivity"
            @openZoom="openZoom"
          />
        </ul>
      </div>

      <button
        v-show="page < Math.ceil(total_items / ITEMS_PER_PAGE)"
        type="button"
        className="load-more"
        @click="page += 1"
      >
        <svg
          class="chevron-down"
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 20 20"
          aria-hidden="true"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>

        Load more
      </button>
    </div>
    <Zoom
      v-if="key && dataWithDisplayName?.length"
      @closeZoom="closeZoom"
      version="v2"
      :item="getActivityById(dataWithDisplayName, key)"
    />
  </div>
</template>

<style scoped>
.wpr {
  max-width: 1600px;
  margin: auto;
  color: var(--primary);
  padding: 12px;
}
.heading {
  font-size: 1.875rem;
  line-height: 2.25rem;
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
