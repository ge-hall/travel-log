<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-200 container mx-auto my-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Travel log
        </h1>
        <p class="py-6">
          Keep track of your travels with this simple travel log.
        </p>
        <AppAuthButton v-if="!authStore.user" />
        <NuxtLink
          v-else
          to="/dashboard"
          class="btn btn-primary"
        >Dashboard</NuxtLink>
      </div>
    </div>
  </div>
</template>
