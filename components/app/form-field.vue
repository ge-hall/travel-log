<script setup lang="ts">
const props = defineProps<{
  label: string;
  name: string;
  type: 'input' | 'textarea' | 'number';
  rows?: number;
  placeholder?: string;
  errorField?: string;
}>();
</script>

<template>
  <div>
    <fieldset class="fieldset">
      <legend class="fieldset-legend">
        {{ props.label }}
      </legend>
      <Field
        :name="props.name || 'name'"
        :as="props.type !== 'number' ? props.type : 'input'"
        :type="props.type"
        class="w-full"
        :class="{
          'input-error': props.errorField,
          'input': (props.type === 'input' || props.type === 'number'),
          'textarea': (props.type === 'textarea'),
        }"
        :rows="props.rows || 0"
        :placeholder="props.placeholder || ''"
      />

      <p
        v-if="props.errorField"
        class="label"
      >
        {{ props.errorField }}
      </p>
    </fieldset>
  </div>
</template>
