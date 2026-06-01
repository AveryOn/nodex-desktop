<script setup lang="ts">
import { RouteName } from '~/renderer/src/router'
</script>

<template>
  <nav class="nav">
    <router-link :to="{ name: RouteName.dairy }" class="option"> Dairy </router-link>

    <router-link :to="{ name: RouteName.dashboard }" class="option"> Dashboard </router-link>

    <router-link :to="{ name: RouteName.profile }" class="option"> Profile </router-link>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 12px;
}

.option {
  background-color: white;
  padding: 10px 8px;
  transition: all ease 0.3s;
  border-radius: 4px;
}

.option:hover {
  background-color: #f3f0f0;
  transition: all ease 0.3s;
  border-radius: 8px;
}
</style>
