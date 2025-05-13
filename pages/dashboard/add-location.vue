<script setup lang="ts">
import type { FetchError } from 'ofetch';
import { toTypedSchema } from '@vee-validate/zod';
import { InsertLocationSchema } from '~/lib/db/schema/location';

const submitError = ref('');
const loading = ref(false);
const submitted = ref(false);
const router = useRouter();
const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocationSchema),
});
const { $csrfFetch } = useNuxtApp();

const onSubmit = handleSubmit(async (values) => {
  loading.value = true;
  submitError.value = '';
  try {
    await $csrfFetch('/api/locations', {
      method: 'post',
      body: values,
    });
    navigateTo('/dashboard');
    submitted.value = true;
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      console.log(error.data?.data);
      setErrors(error.data?.data);
    }
    submitError.value = error.statusMessage || 'An unknown error occured!';
  }
  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    const confirm = window.confirm(
      'Are you sure you want to leave? Any unsaved changes will be lost!',
    );
    if (!confirm) {
      return false;
    }
  }
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1>Add Location</h1>

      <p class="text-sm">
        A location is a place you have travelled or will travel to. It can be a
        city, country, or state, or point of interest. You can add specific
        times you visited the location after adding it.
      </p>
    </div>
    <span
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <Icon
        name="tabler:alert-circle"
        size="24"
      />
      <span>
        {{ submitError }}</span>
    </span>
    <form
      class="flex flex-col gap-2"
      @submit.prevent="onSubmit"
    >
      <AppFormField
        label="Name"
        name="name"
        type="input"
        :disabled="loading"
        :error-field="errors.name"
      />

      <AppFormField
        label="Description"
        name="description"
        type="textarea"
        :rows="5"
        placeholder="Describe this location perhaps with a story about why you visited or what you saw there."
        :disabled="loading"
        :error-field="errors.description"
      />
      <AppFormField
        label="Latitude"
        name="lat"
        type="number"
        :disabled="loading"
        :error-field="errors.lat"
      />
      <AppFormField
        label="Longitude"
        name="long"
        type="number"
        :disabled="loading"
        :error-field="errors.long"
      />
      <div class="flex flex-row gap-2 justify-end">
        <button
          class="btn btn-outline"
          type="button"
          :disabled="loading"
          @click="router.back()"
        >
          Cancel
          <Icon
            name="tabler:arrow-left"
            size="20"
            class="px-1"
          />
        </button>
        <button
          class="btn btn-primary"
          type="submit"
          :disabled="loading"
        >
          Add
          <span
            v-if="loading"
            class="loading loading-ring loading-md"
          />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="20"
            class="px-1"
          />
        </button>
      </div>
    </form>
  </div>
</template>
