<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="45" height="45" /> <span>e-commerce</span>
    <nav>
      <RouterLink to="/login">Login</RouterLink>/
      <RouterLink to="/create_account">Register</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
