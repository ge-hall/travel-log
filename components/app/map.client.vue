<script setup lang="ts">
import { CENTER_GOLD_COAST } from '~/lib/constants';

const colorMode = useColorMode();
const locationStore = useLocationStore();
// const style = 'https://api.maptiler.com/maps/streets/style.json?key=sUxZzTbiMe7mtNw2Glgu';
const style = computed(() =>
  colorMode.value === 'dark'
    ? '/styles/dark.json'
    : 'https://api.maptiler.com/maps/streets/style.json?key=sUxZzTbiMe7mtNw2Glgu',
);
let center = CENTER_GOLD_COAST;
if (locationStore.locations && locationStore.locations.length < 0) {
  center = [locationStore.locations[0].long, locationStore.locations[0].lat];
}
const zoom = 12;
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
