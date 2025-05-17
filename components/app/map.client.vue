<script setup lang="ts">
import {
  MglMap,
  MglMarker,
  MglNavigationControl,
} from '@indoorequal/vue-maplibre-gl';
import { CENTER_GOLD_COAST } from '~/lib/constants';

const colorMode = useColorMode();
const locationStore = useLocationStore();
onMounted(() => {
  locationStore.init();
});
// const style = 'https://api.maptiler.com/maps/streets/style.json?key=sUxZzTbiMe7mtNw2Glgu';
const style = computed(() =>
  colorMode.value === 'dark'
    ? '/styles/dark.json'
    : 'https://api.maptiler.com/maps/streets/style.json?key=sUxZzTbiMe7mtNw2Glgu',
);
let center = CENTER_GOLD_COAST;
if (locationStore.mapPoints && locationStore.mapPoints.length >= 0) {
  center = locationStore.mapPoints[0].coord;
}
const zoom = 4;
</script>

<template>
  <div v-if="locationStore.status === 'pending'">
    <span class="loading loading-ring loading-md" />
  </div>
  <div v-else>
    <MglMap :map-style="style" :center="center" :zoom="zoom">
      <MglMarker
        v-for="mapPoint in locationStore.mapPoints"
        :key="'' + mapPoint.coord.lng + '-' + mapPoint.coord.lat"
        :coordinates="mapPoint.coord"
      >
        <template #marker>
          <div class="tooltip tooltip-top" :data-tip="mapPoint.label">
            <Icon name="tabler:map-pin-filled" size="20" class="text-primary" />
          </div> </template
      ></MglMarker>
      <MglNavigationControl />
    </MglMap>
  </div>
</template>
