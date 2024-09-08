<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue';
import { getWeather } from '../utils/getWeather';

const weather = ref(null);

const fetchWeather = async () => {
  weather.value = await getWeather();
};

await fetchWeather();
</script>

<template>
  <div class="container">
    <img :src="weather?.current?.condition?.icon" height="70" width="70" />
    <div class="textContainer">
      <span class="temp">{{ weather?.current?.temp_c }}</span>
      <span>{{ weather?.location?.name }}</span>
      <span>{{ weather?.location?.region }}</span>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 20px;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
}
.textContainer {
  display: flex;
  flex-direction: column;
}
.temp {
  color: var(--primary-green);
  font-weight: bold;
  font-size: 1.5rem;
  text-transform: uppercase;
}
</style>
