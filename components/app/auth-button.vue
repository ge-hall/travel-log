<script setup lang="ts">
const authStore = useAuthStore();
const userInitials = computed(() => {
  if (!authStore.user) return '';
  const nameTokens = authStore.user.name.split(' ');
  let initials = '';
  nameTokens.forEach((token, i) => {
    // only first two initials
    if (i > 1) return;
    initials += token.charAt(0).toUpperCase();
  });
  return initials;
});
</script>

<template>
  <div
    v-if="!authStore.loading && authStore.user"
    class="dropdown dropdown-end"
  >
    <div
      tabindex="0"
      role="button"
      class="btn btn-ghost m-1"
    >
      <div
        v-if="authStore.user.image"
        class="avatar"
      >
        <div class="mask mask-squircle w-8">
          <img
            :src="authStore.user.image"
            :alt="authStore.user.name"
          >
        </div>
      </div>
      {{ userInitials }}
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
    >
      <li>
        <NuxtLink to="/sign-out">Sign Out
          <Icon
            name="tabler:logout"
            size="24"
          />
        </NuxtLink>
      </li>
    </ul>
  </div>
  <button
    v-else
    class="btn btn-accent"
    :disabled="authStore.loading"
    @click="authStore.signIn"
  >
    Sign In with GitHub
    <span
      v-if="authStore.loading"
      class="loading loading-spinner loading-md"
    />
    <Icon
      v-else
      name="tabler:brand-github"
      size="24"
    />
  </button>
</template>
