import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import expressiveCode from 'astro-expressive-code'
import { remarkPlugins, rehypePlugins } from './plugins'
import { getSiteConfig } from './src/i18n'
import rehypeMermaid from 'rehype-mermaid';

const defaultLocale = 'fr'
const { website, base } = getSiteConfig(defaultLocale)

export default defineConfig({
  site: website,
  base: base,
  middleware: true,
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
    envDir: '.',
    build: {
      chunkSizeWarningLimit: 1200,
    },
    server: {
      host: true,
      allowedHosts: ['blog.jeanvw.fr', 'dev-blog.jeanvw.fr'],
    },
  },
  markdown: {
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid']
    },
    remarkPlugins,
    rehypePlugins: [
      ...rehypePlugins,
      [rehypeMermaid, {
        strategy: 'img-svg',
        dark: true,
        theme: 'default',
        debug: true
      }]
    ],
  },
  integrations: [
    sitemap(),
    robotsTxt(),
    react(),
    expressiveCode(),
    mdx(),
  ],
})

