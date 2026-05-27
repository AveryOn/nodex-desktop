<template>
  <BaseLayout ref="layout" v-model="isAsideOpen" :header-height="40">
    <template #header>
      <div class="header-content">
        <!-- <button @click="toggleAside">☰</button> -->
        <div>
          <h2 class="logo_text">Psych Dairy</h2>
        </div>
      </div>
    </template>

    <template #aside>
      <MenuPanel />
    </template>

    <section class="page-content">
      <router-view></router-view>
    </section>

    <template #footer>
      <!-- <div class="footer-content"> -->
      <!-- </div> -->
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import MenuPanel from '@renderer/components/MenuPanel.vue'
import BaseLayout from '@renderer/layouts/BaseLayout.vue'
import { ref } from 'vue'

const isAsideOpen = ref(false)
</script>

<style scoped>
.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
  border-bottom: 1px solid #e5e7eb;
}

.logo_text {
  color: #9d70a3;
}

.page-content {
  padding: 24px;
}

.footer-content {
  padding: 24px;
  border-top: 1px solid #e5e7eb;
}
</style>
