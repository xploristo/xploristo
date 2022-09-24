<template>
  <main>
    <div v-if="$hasPermissionTo('test.create')">
      <button
        type="button"
        class="button-blue"
        @click="$router.push({ name: 'newTest' })"
      >
        {{ $t('test.create') }}
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
