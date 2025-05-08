<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(value) {
    colorMode.preference = value ? 'dark' : 'light';
  },
});
</script>

<template>
  <label class="swap swap-rotate">
    <!-- this hidden checkbox controls the state -->
    <input
      v-model="isDark"
      type="checkbox"
      class="theme-controller"
      value="synthwave"
    >

    <!-- sun icon -->
    <Icon
      name="tabler:sun"
      size="24"
      class="swap-on"
    />
    <Icon
      name="tabler:moon-filled"
      size="24"
      class="swap-off fill-current"
    />
  </label>
</template>
