<script setup lang="ts">
const isSidebarOpen = ref(true);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem('isSidebarOpen') === 'true';
});
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem('isSidebarOpen', isSidebarOpen.value.toString());
};
</script>

<template>
  <div class="flex-1 flex ">
    <!-- sidebar drawer -->
    <div
      class=" bg-base-100 transition-all transition-duration-400"
      :class="{ 'w-64': isSidebarOpen, 'w-12': !isSidebarOpen }"
    >
      <!-- chevron button -->
      <div
        class="flex hover:bg-base-300  hover:cursor-pointer p-2"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon
          v-if="isSidebarOpen"
          name="tabler:chevron-left"
          size="32"
        />
        <Icon
          v-if="!isSidebarOpen"
          name="tabler:chevron-right"
          size="32"
        />
      </div>

      <!-- action button -->
      <div class="flex flex-col gap-0 mx-0.5 ">
        <AppSideBarButton
          :show-label="isSidebarOpen"
          to="dashboard"
          label="Locations"
          icon="tabler:map"
        />

        <AppSideBarButton
          :show-label="isSidebarOpen"
          to="AddLocation"
          label="Add Location"
          icon="tabler:plus"
        />

        <div class="divider" />
        <AppSideBarButton
          :show-label="isSidebarOpen"
          to="sign-out"
          label="Sign Out"
          icon="tabler:logout"
        />
      </div>
    </div>
    <div class="flex-1 bg-gray-600" />
  </div>
</template>
