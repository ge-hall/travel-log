export type SidebarLocationItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
};
export const useSidebarLocationStore = defineStore('useSidebarLocationStore', () => {
  const sidebarItems = ref<SidebarLocationItem[]>([]);
  const loading = ref(false);
  return {
    sidebarItems,
    loading,
  };
});
export const useLocationStore = defineStore('locationStore', () => {
  const { data, status, refresh } = useFetch('/api/locations', { lazy: true });
  const sidebarLocationStore = useSidebarLocationStore();

  watchEffect(() => {
    if (data.value) {
      sidebarLocationStore.sidebarItems = data.value.map(location => ({
        id: 'location-' + location.id, label: location.name, icon: 'tabler:map-pin', href: `/dashboard/${location.slug}`,

      }));
    }
    sidebarLocationStore.loading = status.value === 'pending';
  });
  return {
    locations: data,
    status,
    refresh,
  };
});
