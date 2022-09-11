<template>
  <div class="flex justify-center mt-20">
    <div class="login-title">{{ $t('login.title') }}</div>
  </div>
  <div class="flex justify-center mb-8">
    <div class="login-subtitle">
      {{ $t('login.subtitle') }}
      <img src="../../public/vision-blue.png" class="inline w-5" />
    </div>
  </div>
  <div class="flex justify-center">
    <div class="form-card flex-1">
      <form @submit.prevent="login">
        <div class="mb-6">
          <label for="email" class="input-label">{{ $t('login.email') }}</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="text-input"
            :placeholder="$t('login.emailPlaceholder')"
            required=""
          />
        </div>

        <div class="mb-6">
          <label for="password" class="input-label">{{
            $t('login.password')
          }}</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="text-input"
            required=""
          />
        </div>

        <button type="submit" class="submit-button">
          {{ $t('login.action') }}
        </button>
      </form>
    </div>
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
