import { defineCollection, z } from 'astro:content'
import { getPostConfig } from '~/i18n'
import type { HeroImageAspectRatio, HeroImageLayout, PostConfig } from '~/types'

const STATIC_POSTS_CONFIG: PostConfig = getPostConfig('fr')

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    recommend: z.boolean().default(false),
    draft: z.boolean().optional(),
    author: z.string().default(STATIC_POSTS_CONFIG.author),
    heroImage: z
      .string()
      .transform((val) => {
        if (!val) return undefined
        return val.startsWith('http') ? val : `/hero-images/${val}`
      })
      .optional(),
    ogImage: z
      .string()
      .transform((val) => {
        if (!val) return undefined
        return val.startsWith('http') ? val : `/og-images/${val}`
      })
      .optional(),
    heroImageLayout: z.custom<HeroImageLayout>().optional(),
    heroImageAspectRatio: z.custom<HeroImageAspectRatio>().default(STATIC_POSTS_CONFIG.defaultHeroImageAspectRatio),
    tags: z.array(z.string()),
  }),
})

export const collections = { posts }
