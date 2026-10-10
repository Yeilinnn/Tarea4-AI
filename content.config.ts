import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    games: defineCollection({
      type: 'data',
      source: 'videojuegos.csv',
      schema: z.object({
        id: z.number(),
        name: z.string(),
        platform: z.string(),
        year: z.number(),
        genre: z.string(),
        publisher: z.string(),
        developer: z.string(),
        rating: z.string(),
        na_sales: z.number(),
        eu_sales: z.number(),
        jp_sales: z.number(),
        other_sales: z.number(),
        global_sales: z.number(),
        critic_score: z.number(),
        critic_count: z.number(),
        user_score: z.number(),
        user_count: z.number()
      })
    })
  }
})
