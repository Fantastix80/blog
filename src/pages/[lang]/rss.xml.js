import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { i18n } from '~/i18n'

export async function getStaticPaths() {
  return ['fr', 'en'].map((lang) => ({
    params: { lang },
  }))
}

export async function GET(context) {
  const lang = context.params.lang ?? 'fr'
  const site = context.site
  const { siteConfig } = i18n.get(lang)

  const posts = (await getCollection('posts'))
    .filter(post => !post.data.draft && post.data.lang === lang)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())

  return rss({
    title: siteConfig.title,
    description: siteConfig.subtitle,
    site: `${site}${lang}/`,
    xmlns: { content: 'http://purl.org/rss/1.0/modules/content/' },
    stylesheet: '/rss/styles.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/${lang}/posts/${post.slug}`,
      customData: `
        <author>${post.data.author || siteConfig.author}</author>
        <lang>${lang}</lang>
        <rssFooter>${siteConfig.footerText}</rssFooter>
      `,
    })),
  })
}
