<script setup>
import { ref, computed, watch } from 'vue';
import { formatDate, buildActivityName } from '../util/helper';
import { prepareData } from '../util/helperV1';
import { activityConfig, imgBackgrounds } from '../config/activities';
import { RouterLink } from 'vue-router';
import VisuallyHidden from '../components/VisuallyHidden.vue';

const props = defineProps({
  version: String,
  item: Object,
});

const emit = defineEmits(['closeZoom']);

console.log('item: ', props.item);
</script>

<template>
  <div class="modal-wrapper">
    <div class="modal-backdrop" />
    <div class="dialog" role="dialog" aria-modal="true" aria-label="{title}">
      <RouterLink
        :to="{ name: version === 'v2' ? 'activitiesV2' : 'activities' }"
        class="modal-close"
        @click="emit('closeZoom')"
      >
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="28"
          width="28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z"
            fill="currentColor"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
            fill="currentColor"
          ></path>
        </svg>
        <VisuallyHidden class="visually-hidden">
          Close modal and return to activities page
        </VisuallyHidden>
      </RouterLink>
      <div class="modal-content">
        <div
          class="activity-img"
          :style="{ background: imgBackgrounds[props.item.topic_data.name] }"
        >
          <img
            alt="activity image"
            :src="`../../../src${props.item.topic_data.icon_path}`"
          />
          <div v-show="props.item.product === 'bpjr'" class="junior-tag">
            Jr.
          </div>
        </div>
        <h2 class="font-bold activity-name">
          {{
            //   buildActivityName(
            //     props.item.topic_data.name,
            //     props.item.resource_type
            //   )
            props.item.displayName
          }}
        </h2>
        <div class="activity-date">
          {{ formatDate(props.item.d_created, false) }}
        </div>
        <div class="comment">{{ props.item.comment }}</div>

        <span
          v-show="activityConfig[props.item.resource_type].score"
          class="score"
        >
          Score
          <span class="font-bold">
            {{ props.item.score }}/{{ props.item.possible_score }}
          </span>
        </span>
      </div>
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
  position: relative;
  width: 52px;
  height: 52px;
  margin: auto;
  border-radius: 50%;
}
.dialog .activity-name {
  font-size: 1.8rem;
  font-weight: 500;
  margin: 10px 0;
}
.dialog .junior-tag {
  position: absolute;
  right: -5px;
  bottom: 0;
  background-color: #fdce68;
  border-radius: 50%;
  color: #62381a;
  display: flex;
  justify-content: center;
  align-items: center;

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
</style>
