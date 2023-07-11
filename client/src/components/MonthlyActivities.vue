<script setup>
import { extractMonth, formatDate, resourceNameFromPath } from '../util/helper';
import { activityConfig, imgBackgrounds } from '../config/activities';
import { RouterLink } from 'vue-router';

const emit = defineEmits(['hideActivity']);

const props = defineProps({
  monthData: Array,
  endPoint: String,
});
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
          <button
            class="font-bold hide"
            @click="emit('hideActivity', activity.id)"
          >
            <!-- <ImEyeBlocked size='20' class='icon-visual' />  -->
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              viewBox="0 0 16 16"
              class="icon-visual"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.78 0.22c-0.293-0.293-0.768-0.293-1.061 0l-3.159 3.159c-0.812-0.246-1.671-0.378-2.561-0.378-3.489 0-6.514 2.032-8 5 0.643 1.283 1.573 2.391 2.703 3.236l-2.484 2.484c-0.293 0.293-0.293 0.768 0 1.061 0.146 0.146 0.338 0.22 0.53 0.22s0.384-0.073 0.53-0.22l13.5-13.5c0.293-0.293 0.293-0.768 0-1.061zM6.5 5c0.66 0 1.22 0.426 1.421 1.019l-1.902 1.902c-0.592-0.201-1.019-0.761-1.019-1.421 0-0.828 0.672-1.5 1.5-1.5zM1.721 8c0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 0.858 0.27 1.652 0.73 2.303l-0.952 0.952c-0.819-0.576-1.519-1.311-2.057-2.162z"
              ></path>
              <path
                d="M12 6.906c0-0.424-0.066-0.833-0.189-1.217l-5.028 5.028c0.384 0.123 0.793 0.189 1.217 0.189 2.209 0 4-1.791 4-4z"
              ></path>
              <path
                d="M12.969 4.531l-1.084 1.084c0.020 0.012 0.040 0.024 0.059 0.037 0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152-0.604 0-1.202-0.074-1.781-0.219l-1.201 1.201c0.933 0.335 1.937 0.518 2.982 0.518 3.489 0 6.514-2.032 8-5-0.703-1.405-1.752-2.6-3.031-3.469z"
              ></path>
            </svg>
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
            class="link"
            v-show="activityConfig[activity.resource_type].zoom"
            :to="`${endPoint}/${activity.id}`"
          >
            <span class="font-bold">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 16 16"
                class="icon-visual"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3c-3.489 0-6.514 2.032-8 5 1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zM11.945 5.652c0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152s-2.763-0.398-3.945-1.152c-0.94-0.6-1.737-1.403-2.335-2.348 0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.481-0.085-0.942-0.241-1.369 0.062 0.037 0.124 0.075 0.185 0.114v0zM8 6.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"
                ></path>
              </svg>

              View work
              <!-- <ImEye size='20' class='icon-visual' /> View work -->
            </span>
          </RouterLink>
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
  align-items: center;
}
.hide {
  color: inherit;
}
.font-bold {
  font-weight: bold;
}
.link {
  text-decoration: none;
  color: inherit;
}
.icon-visual {
  display: inline-block;
  margin-right: 4px;
  vertical-align: text-top;
}
</style>
