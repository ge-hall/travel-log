export type LocationButton = {
  id: string;
  label: string;
  icon: string;
  href: string;
};
export type Coordinate = { lng: string; lat: number };
export type MapPoint = {
  label: string;
  coord: Coordinate;
};

export const useLocationStore = defineStore('locationStore', () => {
  const { data, status, refresh } = useFetch('/api/locations');

  const locationButtons = computed(() => {
    return data.value
      ? data.value.map((location) => ({
          id: 'location-' + location.id,
          label: location.name,
          icon: 'tabler:map-pin',
          href: `/dashboard/${location.slug}`,
        }))
      : [];
  });
  const mapPoints = computed(() => {
    return data.value
      ? data.value.map((location) => ({
          label: location.name,
          coord: {
            lng: location.long,
            lat: location.lat,
          },
        }))
      : [];
  });
  async function init() {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');
    const { LngLatBounds } = await import('maplibre-gl');
    effect(() => {
      console.log(`entering mapBounds computed function`);
      const initCoord: [number, number, number, number] = data.value
        ? [
            data.value[0].long,
            data.value[0].lat,
            data.value[0].long,
            data.value[0].lat,
          ]
        : [0, 0, 0, 0];

      console.log(`initCoord = ${initCoord}`);
      const mapBounds = data.value
        ? data.value.reduce((bounds, location) => {
            return bounds.extend([location.long, location.lat]);
          }, new LngLatBounds(initCoord))
        : new LngLatBounds(initCoord);
      console.log(`mapBounds = ${mapBounds}`);
      const map = useMap();
      map.map?.fitBounds(mapBounds, { padding: 50 });
      return mapBounds;
    });
  }

  return {
    locations: data,
    mapPoints,
    init,
    locationButtons,
    status,
    refresh,
  };
});
