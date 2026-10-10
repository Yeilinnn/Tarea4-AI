// app/stores/games.ts
import type { GamesCollectionItem } from '@nuxt/content'

type Status = 'init' | 'loading' | 'success' | 'error'

// Nuxt Content puede entregar los valores del CSV como texto: se convierten a númeronpx nuxt prepare
function normalize(g: GamesCollectionItem): GamesCollectionItem {
  return {
    ...g,
    id: Number(g.id),
    year: Number(g.year),
    na_sales: Number(g.na_sales),
    eu_sales: Number(g.eu_sales),
    jp_sales: Number(g.jp_sales),
    other_sales: Number(g.other_sales),
    global_sales: Number(g.global_sales),
    critic_score: Number(g.critic_score),
    critic_count: Number(g.critic_count),
    user_score: Number(g.user_score),
    user_count: Number(g.user_count)
  }
}

async function loadAll(): Promise<GamesCollectionItem[]> {
  const all = await queryCollection('games').all()
  return all.map(normalize).sort((a, b) => a.id - b.id)
}

export const useGamesStore = defineStore('games', () => {
  // Estado
  const games = ref<GamesCollectionItem[]>([])
  const game = ref<GamesCollectionItem | null>(null)
  const prev = ref<GamesCollectionItem | null>(null)
  const next = ref<GamesCollectionItem | null>(null)
  const status = ref<Status>('init')
  const error = ref<string | null>(null)

  // Favoritos: se guardan en una cookie para que sobrevivan al recargar la página
  const favorites = useCookie<number[]>('favorites', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 365
  })

  // Getters
  const total = computed(() => games.value.length)
  const isLoading = computed(() => status.value === 'loading')
  const averageUserScore = computed(() => {
    if (!games.value.length) return 0
    const suma = games.value.reduce((acc, g) => acc + g.user_score, 0)
    return Math.round((suma / games.value.length) * 100) / 100
  })
  const favoriteGames = computed(() =>
    games.value.filter(g => favorites.value.includes(g.id))
  )

  // Ejecuta una tarea asincrónica y registra su estado (carga, éxito o error)
  async function run(task: () => Promise<void>) {
    status.value = 'loading'
    error.value = null
    try {
      await task()
      status.value = 'success'
    } catch (e) {
      status.value = 'error'
      error.value = e instanceof Error ? e.message : String(e)
    }
  }

  // Acciones
  async function fetchGames() {
    if (games.value.length) return
    await run(async () => {
      games.value = await loadAll()
    })
  }

  async function fetchGame(id: number) {
    await run(async () => {
      if (!games.value.length) games.value = await loadAll()

      const found = await queryCollection('games').where('id', '=', id).first()
      game.value = found
        ? normalize(found)
        : games.value.find(g => g.id === id) ?? null

      // Anterior y siguiente se calculan sobre la lista ordenada numéricamente
      const i = games.value.findIndex(g => g.id === id)
      prev.value = i > 0 ? games.value[i - 1]! : null
      next.value = i >= 0 && i < games.value.length - 1 ? games.value[i + 1]! : null
    })
  }

  function toggleFavorite(id: number) {
    if (favorites.value.includes(id)) {
      favorites.value = favorites.value.filter(f => f !== id)
    } else {
      favorites.value = [...favorites.value, id]
    }
  }

  return {
    games, game, prev, next, favorites, status, error,
    total, isLoading, averageUserScore, favoriteGames,
    fetchGames, fetchGame, toggleFavorite
  }
})