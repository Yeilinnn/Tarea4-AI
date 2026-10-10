<!-- app/pages/index.vue -->
<template>
  <div class="container">
    <HeaderView />
    <h1>Videojuegos más vendidos</h1>
    <p>
      Catálogo de los 300 videojuegos con más ventas globales que cuentan con calificación de
      críticos y de usuarios. Explora el listado, revisa el detalle de cada juego y marca tus favoritos.
    </p>
    <NuxtLink class="btn" to="/games">Ver el listado →</NuxtLink>
    <FooterView />
  </div>
</template>
