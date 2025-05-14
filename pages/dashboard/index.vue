<script setup lang="ts">
const { data, status } = useFetch('/api/locations', { lazy: true });
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl">
      Locations
    </h2>
    <div v-if="status === 'pending'">
      <span class="loading loading-ring loading-md" />
    </div>
    <div
      v-else-if="data"
      class="flex flex-wrap mt-4 gap-2"
    >
      <div
        v-for="location in data"
        :key="location.id"
        class="card compact-card bg-base-200 h-40 w-72"
      >
        <div class="card-body">
          <h3 class="text-xl">
            {{ location.name }}
          </h3>
          <p>{{ location.description }}</p>
        </div>
      </div>
      <!-- <pre>{{ JSON.stringify(data, null, 2) }}</pre> -->
    </div>
    <div
      v-else
      class="flex flex-col gap-2 mt-4"
    >
      <p>
        Add locations to track your travels.
      </p>
      <div>
        <NuxtLink
          to="/dashboard/add-location"
          class="btn btn-primary"
        >
          Add Location
          <Icon
            name="tabler:circle-plus-filled"
            size="24"
            class="px-1"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
