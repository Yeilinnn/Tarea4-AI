<!-- app/pages/games/[id].vue -->
<script setup lang="ts">
const route = useRoute()
const store = useGamesStore()
const { game, prev, next } = storeToRefs(store)

const id = Number(route.params.id)
await callOnce(`game-${id}`, () => store.fetchGame(id))

if (!game.value || game.value.id !== id) {
  throw createError({ statusCode: 404, statusMessage: 'Videojuego no encontrado', fatal: true })
}
</script>

<template>
  <div class="container">
    <HeaderView />
    <NuxtLink to="/games">← Volver al listado</NuxtLink>
    <div v-if="game">
      <h1>{{ game.name }}</h1>
      <button class="btn" @click="store.toggleFavorite(game.id)">
        {{ store.favorites.includes(game.id) ? '★ Quitar de favoritos' : '☆ Agregar a favoritos' }}
      </button>
      <table class="fields">
        <tbody>
          <tr><th>ID</th><td>{{ game.id }}</td></tr>
          <tr><th>Plataforma</th><td>{{ game.platform }}</td></tr>
          <tr><th>Año</th><td>{{ game.year }}</td></tr>
          <tr><th>Género</th><td>{{ game.genre }}</td></tr>
          <tr><th>Publisher</th><td>{{ game.publisher }}</td></tr>
          <tr><th>Developer</th><td>{{ game.developer }}</td></tr>
          <tr><th>Clasificación ESRB</th><td>{{ game.rating }}</td></tr>
          <tr><th>Ventas Norteamérica (M)</th><td>{{ game.na_sales }}</td></tr>
          <tr><th>Ventas Europa (M)</th><td>{{ game.eu_sales }}</td></tr>
          <tr><th>Ventas Japón (M)</th><td>{{ game.jp_sales }}</td></tr>
          <tr><th>Ventas otras regiones (M)</th><td>{{ game.other_sales }}</td></tr>
          <tr><th>Ventas globales (M)</th><td>{{ game.global_sales }}</td></tr>
          <tr><th>Puntaje de críticos</th><td>{{ game.critic_score }} / 100</td></tr>
          <tr><th>Cantidad de críticos</th><td>{{ game.critic_count }}</td></tr>
          <tr><th>Puntaje de usuarios</th><td>{{ game.user_score }} / 10</td></tr>
          <tr><th>Cantidad de usuarios</th><td>{{ game.user_count }}</td></tr>
        </tbody>
      </table>
    </div>
    <div class="pager">
      <NuxtLink v-if="prev" :to="`/games/${prev.id}`">← {{ prev.name }}</NuxtLink>
      <span v-else />
      <NuxtLink v-if="next" :to="`/games/${next.id}`">{{ next.name }} →</NuxtLink>
    </div>
    <FooterView />
  </div>
</template>
