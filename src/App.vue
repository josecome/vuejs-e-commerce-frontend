<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="45" height="45" /> <span>e-commerce</span>

    <div class="wrapper">

      <nav>
        <RouterLink to="/login">Login</RouterLink>/
        <RouterLink to="/register">Register</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
