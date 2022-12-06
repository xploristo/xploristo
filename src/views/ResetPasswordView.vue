<template>
  <div class="flex justify-center mt-20">
    <div class="login-title">{{ $t('reset.title') }}</div>
  </div>
  <div class="flex justify-center mb-8">
    <div class="login-subtitle">
      {{ $t('reset.subtitle') }}
      <img src="/images/vision-blue.png" class="inline w-5" />
    </div>
  </div>
  <div class="flex justify-center">
    <div class="form-card flex-1">
      <form @submit.prevent="setPassword">
        <div class="mb-6">
          <label for="oldPassword" class="input-label">{{
            $t('reset.oldPassword')
          }}</label>
          <input
            type="password"
            id="oldPassword"
            v-model="oldPassword"
            class="text-input"
            required=""
          />
        </div>

        <div class="mb-6">
          <label for="password" class="input-label">{{
            $t('reset.password')
          }}</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="text-input"
            required=""
          />
        </div>

        <div class="mb-6">
          <label for="confirmPassword" class="input-label">{{
            $t('reset.confirmPassword')
          }}</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="text-input"
            :pattern="password"
            required=""
          />
        </div>

        <button type="submit" class="button-blue">
          {{ $t('reset.action') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/user.js';

export default {
  name: 'ResetPasswordView',
  props: {
    generatedPassword: { type: String },
  },
  data() {
    return {
      oldPassword: this.generatedPassword,
      password: null,
      confirmPassword: null,
    };
  },
  methods: {
    async setPassword() {
      try {
        const userStore = useUserStore();
        await userStore.setPassword(
          this.oldPassword,
          this.password,
          this.confirmPassword
        );
        this.$router.push({ name: 'home' });
      } catch (error) {
        // TODO Handle error properly
        console.error(error);
      }
    },
  },
};
</script>
