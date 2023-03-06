<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/headers/Navbar.vue'
</script>

<template>
  <header>
    <Navbar />
  </header>
  <RouterView />
</template>
