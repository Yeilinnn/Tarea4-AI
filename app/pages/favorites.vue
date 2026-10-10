<!-- app/pages/favorites.vue -->
<script setup lang="ts">
const store = useGamesStore()
await callOnce('games-list', () => store.fetchGames())
</script>

<template>
  <div class="container">
    <HeaderView />
    <h1>Mis favoritos</h1>
    <p v-if="!store.favoriteGames.length">Todavía no hay videojuegos marcados como favoritos.</p>
    <ul class="list">
      <li v-for="g in store.favoriteGames" :key="g.id">
        <NuxtLink :to="`/games/${g.id}`">{{ g.name }}</NuxtLink>
        <span class="meta">{{ g.platform }} · {{ g.year }}</span>
        <button class="fav" @click="store.toggleFavorite(g.id)">★</button>
      </li>
    </ul>
    <FooterView />
  </div>
</template>
