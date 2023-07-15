<script>
export default {
  name: 'HomeView',
  created() {
    if (this.$hasPermissionTo('tests.list')) {
      this.$router.push('/tests');
    } else {
      this.$router.push('/groups');
    }
  },
};
</script>

<template>
  <main></main>
</template>
