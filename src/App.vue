<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
const route = useRoute();
console.log('Route Name: ' + route.name)
</script>

<template>
  <header v-show="route.name !== 'dashboard'">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="45" height="45" /> <span>e-commerce</span>
    <nav>
      <RouterLink to="/login">Login</RouterLink>/
      <RouterLink to="/create_account">Register</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
<style>
  @import "bootstrap/dist/css/bootstrap.css";
  @import "bootstrap-icons/font/bootstrap-icons.css";
</style>
<style scoped>

</style>
