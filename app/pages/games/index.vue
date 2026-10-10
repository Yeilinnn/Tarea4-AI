<!-- app/pages/games/index.vue -->
<script setup lang="ts">
const store = useGamesStore()
const { games, total, isLoading, error, averageUserScore } = storeToRefs(store)

await callOnce('games-list', () => store.fetchGames())
</script>

<template>
  <div class="container">
    <HeaderView />
    <h1>Videojuegos ({{ total }})</h1>
    <p class="avg">Calificación promedio de los usuarios: <strong>{{ averageUserScore }}</strong> / 10</p>
    <p v-if="isLoading">Cargando…</p>
    <p v-else-if="error">Error: {{ error }}</p>
    <ul v-else class="list">
      <li v-for="g in games" :key="g.id">
        <NuxtLink :to="`/games/${g.id}`">{{ g.name }}</NuxtLink>
        <span class="meta">{{ g.platform }} · {{ g.year }} · {{ g.user_score }}</span>
        <button class="fav" @click="store.toggleFavorite(g.id)">
          {{ store.favorites.includes(g.id) ? '★' : '☆' }}
        </button>
      </li>
    </ul>
    <FooterView />
  </div>
</template>
