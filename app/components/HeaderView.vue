<!-- app/components/HeaderView.vue -->
<script setup lang="ts">
const store = useGamesStore()
</script>

<template>
  <header class="nav">
    <NuxtLink to="/" class="brand">🎮 Videojuegos</NuxtLink>
    <nav>
      <NuxtLink to="/">Inicio</NuxtLink>
      <NuxtLink to="/games">Juegos</NuxtLink>
      <NuxtLink to="/favorites">Favoritos ({{ store.favorites.length }})</NuxtLink>
    </nav>
  </header>
</template>
