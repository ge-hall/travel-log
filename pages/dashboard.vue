<script setup lang="ts">
import { useLocationStore } from '~/stores/locations';

const route = useRoute();
const locationStore = useLocationStore();
const isSidebarOpen = ref(true);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem('isSidebarOpen') === 'true';
  if (route.path !== '/dashboard') {
    locationStore.refresh();
  }
});
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString());
};
</script>

<template>
  <div class="flex-1 flex">
    <!-- sidebar drawer -->
    <div
      class="bg-base-100 transition-all transition-duration-400 shrink-0"
      :class="{ 'w-64': isSidebarOpen, 'w-12': !isSidebarOpen }"
    >
      <!-- chevron button -->
      <div
        class="flex hover:bg-base-300 hover:cursor-pointer p-2"
        :class="{
          'justify-center': !isSidebarOpen,
          'justify-end': isSidebarOpen,
        }"
        @click="toggleSidebar"
      >
        <Icon v-if="isSidebarOpen" name="tabler:chevron-left" size="32" />
        <Icon v-if="!isSidebarOpen" name="tabler:chevron-right" size="32" />
      </div>

      <!-- action button -->
      <div class="flex flex-col gap-0 mx-0.5">
        <AppSideBarButton
          :show-label="isSidebarOpen"
          to="/dashboard"
          label="Locations"
          icon="tabler:map"
        />

        <AppSideBarButton
          :show-label="isSidebarOpen"
          to="/dashboard/add-location"
          label="Add Location"
          icon="tabler:circle-plus-filled"
        />

        <div
          v-if="
            locationStore.status === 'pending' ||
            locationStore.locationButtons.length
          "
          class="divider"
        />
        <div v-if="locationStore.status === 'pending'">
          <div class="skeleton h-4 px-4 w-full" />
        </div>
        <div v-else class="flex flex-col bg-base-200">
          <AppSideBarButton
            v-for="item in locationStore.locationButtons"
            :key="item.id"
            :show-label="isSidebarOpen"
            to="#"
            :label="item.label"
            :icon="item.icon"
          />
        </div>
        <div class="divider" />
        <AppSideBarButton
          :show-label="isSidebarOpen"
          to="sign-out"
          label="Sign Out"
          icon="tabler:logout"
        />
      </div>
    </div>
    <div class="flex-1 overflow-auto">
      <div class="flex flex-col size-full">
        <NuxtPage />
        <AppMap class="flex-1" />
      </div>
    </div>
  </div>
</template>
