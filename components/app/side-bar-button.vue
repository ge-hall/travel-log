<script setup lang="ts">
const route = useRoute();
const props = defineProps<{
  label: string;
  showLabel: boolean;
  icon: string;
  to: string;
  iconColor?: 'text-accent' | 'text-primary' | 'text-secondary';
}>();
</script>

<template>
  <div
    :class="{ 'md:tooltip  md:tooltip-right': !showLabel }"
    :data-tip="props.label"
  >
    <NuxtLink
      :to="props.to"
      :class="{
        'bg-base-200': route.name === props.to,
        'border-y-gray-700': route.name == props.to,
        'justify-center': !showLabel,
        'justify-start': showLabel,
      }"
      class="flex flex-nowrap gap-2 p-2 hover:bg-base-300 hover:cursor-pointer border border-base-100"
    >
      <Icon :name="props.icon" size="24" :class="iconColor" />
      <Transition name="grow">
        <span v-if="showLabel"> {{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style scoped>
.grow-enter-active {
  animation: grow 0.3s ease;
}

.grow-leave-active {
  animation: grow 0.2s ease reverse;
}

@keyframes grow {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
