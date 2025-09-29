import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
})

const course = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/course' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slides: z.string().url().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    date: z
      .string()
      .or(z.date())
      .transform((val: string | number | Date) => new Date(val).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })),
    draft: z.boolean().default(false).optional(),
    lang: z.string().default('de-DE').optional(),
    redirect: z.string().optional(),
  }),
})

export const collections = { pages, course }
