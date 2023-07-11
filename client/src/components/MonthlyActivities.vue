<script setup>
import { toRefs, computed } from 'vue';
import { extractMonth, formatDate, resourceNameFromPath } from '../util/helper';
import { activityConfig, imgBackgrounds } from '../config/activities';
import { RouterLink } from 'vue-router';

const props = defineProps({
  monthData: Array,
  endPoint: String,
  hideActivity: Function,
});
// const {
//   id,
//   resource_type,
//   score,
//   possible_score,
//   product,
//   topic_data,
//   d_created,
//   displayName,
//   comment,
// } = toRefs(props);
//  import { imgMap, imgBgs } from './Images';
//     import { ImEye, ImEyeBlocked } from 'react-icons/im';
//     import { Link } from 'react-router-dom';
</script>

<template>
  <li>
    <div class="month-tag">
      {{ extractMonth(props.monthData[0].d_created) }}
    </div>
    <ol>
      <li
        v-for="activity in props.monthData"
        :key="activity.id"
        class="activity-item"
      >
        <div class="activity-media">
          <div
            class="activity-img"
            :style="{ background: imgBackgrounds[activity.topic_data.name] }"
          >
            <img
              alt="activity image"
              :src="`../../../src${activity.topic_data.icon_path}`"
            />
            <div v-show="activity.product === 'bpjr'" class="junior-tag">
              Jr.
            </div>
          </div>
          <div class="font-bold activity-name">
            {{ activity.displayName }}
          </div>
          <div class="activity-date">
            {{ formatDate(activity.d_created, false) }}
          </div>
        </div>
        <span class="details">
          <button class="font-bold" @click="hideActivity(activity.id)">
            <!-- <ImEyeBlocked size='20' class='icon-visual' />  -->
            Hide
          </button>
          <span
            v-show="activityConfig[activity.resource_type].score"
            class="score"
          >
            Score
            <span class="font-bold">
              {{ activity.score }}/{{ activity.possible_score }}
            </span>
          </span>
          <RouterLink
            v-show="activityConfig[activity.resource_type].zoom"
            :to="`${endPoint}/${activity.id}`"
          >
            <span class="font-bold">
              View work
              <!-- <ImEye size='20' class='icon-visual' /> View work -->
            </span>
          </RouterLink>

          <!-- {activityConfig[resource_type].zoom && (
                  <Link
                    to={`${endPoint}/${id}`}
                    state={{
                      resource_type,
                      score,
                      possible_score,
                      product,
                      topic_data,
                      d_created,
                      displayName,
                      comment,
                      // eslint-disable-next-line react/prop-types
                      version: endPoint.includes('v2') ? 2 : 1,
                    }}
                  >
                    <span class='font-bold'>
                      <ImEye size='20' class='icon-visual' /> View work
                    </span>
                  </Link>
                )} -->
        </span>
      </li>
    </ol>
  </li>
</template>

<style scoped>
.month-tag {
  width: 150px;
  height: 36px;
  background-color: var(--bg-primary);
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 30px;
  font-size: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.activity-item {
  position: relative;
  border: 1px;
  margin-bottom: 28px;
  height: 144px;
  color: var(--primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-left: 20px;
  padding-right: 40px;
  border: 1px solid var(--borderColor);
  border-radius: 6px;
}
.activity-item::after,
.activity-item:first-child::before {
  content: '';
  position: absolute;
  width: 1px;
  height: 30px;
  left: 75px;
  bottom: -30px;
  background: #cbcccd;
}
.activity-item:first-child::before {
  bottom: auto;
  top: -30px;
}
ol:last-child .activity-item:last-child::after {
  display: none;
}
.activity-media {
  display: grid;
  grid-template-columns: 68px auto;
  grid-template-rows: auto auto;
  gap: 0 15px;
  height: 68px;
}
.activity-img {
  height: 68px;
  grid-column: 1/2;
  grid-row: 1/3;
  padding: 6px;
  border-radius: 50%;
  position: relative;
}
.junior-tag {
  position: absolute;
  right: -5px;
  bottom: 0;
  width: 28px;
  height: 28px;
  background-color: #fdce68;
  border-radius: 50%;
  color: #62381a;
  display: flex;
  justify-content: center;
  align-items: center;
}
.activity-name {
  grid-column: 2/3;
  grid-row: 1/2;
  align-self: end;
}
.activity-date {
  grid-column: 2/3;
  grid-row: 2/3;
  align-self: start;
}
.details {
  color: #008081;
  display: flex;
  gap: 30px;
}
.font-bold {
  font-weight: bold;
}
</style>
