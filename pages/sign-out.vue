<script setup lang="ts">
const authStore = useAuthStore();

onMounted(async () => {
  authStore.signOut();
  navigateTo('/');
});
</script>

<template>
  <div class="hero bg-base-200 container mx-auto my-4">
    <span class="loading loading-spinner loading-xl" />
  </div>
</template>
