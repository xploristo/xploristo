<template>
  <div>
    <form @submit.prevent="login">
      <input
        id="email"
        type="email"
        v-model="email"
        placeholder="Correo electrónico"
      />
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Contraseña"
      />
      <input type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user.js';

export default {
  name: 'LoginView',
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async login() {
      try {
        const userStore = useUserStore();
        await userStore.login(this.email, this.password);
        this.$router.push({ name: 'home' });
      } catch (error) {
        // TODO Handle error properly
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss">
form {
  display: flex;
  flex-direction: column;
  max-width: 50%;

  input {
    display: flex;
    margin-top: 10px;
  }
}
</style>
