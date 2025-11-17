import type {
  Site,
  Link,
  SocialLink,
  SkillsShowcaseConfig,
  GithubConfig,
  PostConfig,
  TagsConfig,
  ProjectConfig,
  Project,
} from '~/types'

export type Locale = 'fr' | 'en'
export type LangProp = { lang?: Locale }

export const getLocaleFromPath = (pathname: string): Locale =>
  pathname.startsWith('/en') ? 'en' : 'fr'

// Configs par section
const getSiteConfig = (locale: Locale): Site => ({
  title: "Hell0W0rld's blog",
  subtitle:
    locale === 'fr'
      ? "Le blog d'un étudiant français en cybersécurité"
      : "A cybersecurity french student's blog",
  description1:
    locale === 'fr'
      ? "Salut ! Je suis Jean, étudiant en cybersécurité. J'ai un homelab, un SOC, certifié CDSA et je participe à certains CTF. Je travaille comme ingénieur sécurité et ce blog suit mon parcours."
      : "Hey ! I'm Jean a 5th year cybersecurity student. I have built a personal homelab (also working on a personnal SOC), CDSA certified and currently interested in CTFs. I work as a cybersecurity engineer so I will use this blog to track my journey into the IT world.",
  description2:
    locale === 'fr'
      ? "C'est un pense-bête pour moi, mais tu pourrais y trouver de l'intérêt ;)"
      : "This will serve as a reminder for my future me but you might also find interesting stuff for you who knows ;)",
  website: 'https://blog.jeanvw.fr/',
  base: '/',
  author: 'Jean',
  ogImage: '/og-image.jpg',
  footerText: locale === 'fr' ? "© 2025 Hell0W0rld's blog. Tous droits réservés." : "© 2025 Hell0W0rld's blog. All rights reserved.",
})

const getHeaderLinks = (locale: Locale): Link[] => [
  { name: locale === 'fr' ? 'Articles' : 'Posts', url: locale === 'en' ? '/en/posts' : '/fr/posts' },
  { name: locale === 'fr' ? 'Projets' : 'Projects', url: locale === 'en' ? '/en/projects' : '/fr/projects' },
  { name: locale === 'fr' ? 'Tags' : 'Tags', url: locale === 'en' ? '/en/tags' : '/fr/tags' },
]

const getFooterLinks = (locale: Locale): Link[] => [
  { name: locale === 'fr' ? 'Accueil' : 'Home', url: locale === 'en' ? '/en' : '/fr' },
  { name: locale === 'fr' ? 'Articles' : 'Posts', url: locale === 'en' ? '/en/posts' : '/fr/posts' },
  { name: locale === 'fr' ? 'Projets' : 'Projects', url: locale === 'en' ? '/en/projects' : '/fr/projects' },
  { name: locale === 'fr' ? 'Tags' : 'Tags', url: locale === 'en' ? '/en/tags' : '/fr/tags' },
]

const getSocialLinks = (): SocialLink[] => [
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/jeanvwg/',
    icon: 'icon-[ri--linkedin-box-fill]',
  },
  {
    name: 'github',
    url: 'https://github.com/Fantastix80',
    icon: 'icon-[ri--github-fill]',
  },
  {
    name: 'website',
    url: 'https://jeanvw.fr',
    icon: 'icon-[akar-icons--globe]',
  },
]

const getSkillsShowcaseConfig = (): SkillsShowcaseConfig => ({
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        { name: 'Python', icon: 'icon-[mdi--language-python]' },
        { name: 'C', icon: 'icon-[mdi--language-c]' },
        { name: 'C++', icon: 'icon-[mdi--language-cpp]' },
        { name: 'Rust', icon: 'icon-[mdi--language-rust]' },
        { name: 'React', icon: 'icon-[mdi--react]' },
        { name: 'PHP', icon: 'icon-[mdi--language-php]' },
        { name: 'Java', icon: 'icon-[mdi--language-java]' },
        { name: 'Assembly', icon: 'icon-[mdi--code-tags]' },
      ],
    },
    {
      direction: 'right',
      skills: [
        { name: 'PowerBI', icon: 'icon-[simple-icons--microsoft]' },
        { name: 'SQL', icon: 'icon-[simple-icons--mysql]' },
        { name: 'Intune', icon: 'icon-[simple-icons--microsoft]' },
        { name: 'MongoDB', icon: 'icon-[lineicons--mongodb]' },
        { name: 'EntraID', icon: 'icon-[simple-icons--microsoft]' },
        { name: 'Splunk', icon: 'icon-[simple-icons--splunk]' },
      ],
    },
    {
      direction: 'left',
      skills: [
        { name: 'Unreal Engine', icon: 'icon-[mdi--unreal]' },
        { name: 'Git', icon: 'icon-[mdi--git]' },
        { name: 'Binaryninja', icon: 'icon-[mdi--ninja]' },
        { name: 'Wireshark', icon: 'icon-[simple-icons--wireshark]' },
        { name: 'Linux', icon: 'icon-[mdi--linux]' },
        { name: 'ACL', icon: 'icon-[mdi--mountain-outline]' },
        { name: 'Burp Suite', icon: 'icon-[simple-icons--burpsuite]' },
      ],
    },
  ],
})

const getGithubConfig = (): GithubConfig => ({
  ENABLED: true,
  GITHUB_USERNAME: 'Fantastix80',
  TOOLTIP_ENABLED: true,
})

const getPostConfig = (locale: Locale): PostConfig => ({
  title: locale === 'fr' ? 'Articles' : 'Posts',
  description: locale === 'fr'
    ? 'Voici mes derniers articles, j’espère qu’ils vous seront utiles.'
    : "Here, I am sure you will find something interesting for you ^^",
  introduce: locale === 'fr'
    ? 'Un peu de tout, beaucoup de passion !'
    : "Here, I am sure you will find something interesting for you ^^",
  author: 'Jean',
  homePageConfig: { size: 5, type: 'compact' },
  postPageConfig: { size: 10, type: 'image' },
  tagsPageConfig: { size: 10, type: 'time-line' },
  defaultHeroImage: '/og-image.jpg',
  defaultHeroImageAspectRatio: '16/9',
  imageDarkenInDark: true,
  readMoreText: locale === 'fr' ? 'Lire plus' : 'Read more',
  prevPageText: locale === 'fr' ? 'Précédent' : 'Previous',
  nextPageText: locale === 'fr' ? 'Suivant' : 'Next',
  tocText: locale === 'fr' ? 'Sur cette page' : 'On this page',
  backToPostsText: locale === 'fr' ? 'Retour aux articles' : 'Back to Posts',
  nextPostText: locale === 'fr' ? 'Article suivant' : 'Next Post',
  prevPostText: locale === 'fr' ? 'Article précédent' : 'Previous Post',
})

const getTagsConfig = (locale: Locale): TagsConfig => ({
  title: 'Tags',
  description:
    locale === 'fr'
      ? 'Tous les tags sont ici, cliquez pour filtrer.'
      : 'All the tags for posts are here, you can click to filter them.',
  introduce:
    locale === 'fr'
      ? 'Trouvez les articles qui vous intéressent plus facilement.'
      : 'All the tags for posts are here, you can click to filter them.',
})

const getProjectsConfig = (locale: Locale): ProjectConfig => ({
  title: locale === 'fr' ? 'Projets' : 'Projects',
  description:
    locale === 'fr' ? 'Voici quelques-uns de mes projets.' : 'Here are some examples of my projects.',
  introduce:
    locale === 'fr' ? 'Passion, code et curiosité.' : 'Here are some examples of my projects.',
})

const getProjectList = (locale: Locale): Project[] => [
  {
    name: 'Portfolio',
    description:
      locale === 'fr'
        ? 'Mon portfolio personnel construit en 2022.'
        : 'My personal portfolio built in 2022.',
    website: 'https://jeanvw.fr',
    type: 'image',
    icon: '/projects/logo.png',
  },
  {
    name: 'Pokemon',
    description:
      locale === 'fr'
        ? 'Un site d’ouverture de coffres où le but est de grimper dans le classement.'
        : 'A case-opening like website. Your goal is to be in the top leaderboard!',
    website: 'https://pokemon.jeanvw.fr',
    type: 'image',
    icon: '/projects/logo.png',
  },
]

const getGithubContributionsConfig = (locale: Locale) => ({
  spotlightTitle: locale === 'fr' ? 'À la une' : 'Spotlight',
  spotlightDescription: locale === 'fr'
    ? 'Mes contributions récentes.'
    : 'Most recent contributions.',
})

const getSkillsHeaderConfig = (locale: Locale) => ({
  skillsTitle: locale === 'fr' ? 'Compétences' : 'Skills',
  skillsDescription: locale === 'fr'
    ? 'Voici quelques-unes des compétences que j’utilise :'
    : 'Here are some of the skills I use:',
})

const getPostsHeaderConfig = (locale: Locale) => ({
  recentPosts: locale === 'fr'
    ? '{count} articles récents, en espérant qu’ils vous soient utiles.'
    : 'Recent {count} blog posts, hoping to be helpful.',
})


const getNotFoundConfig = (locale: Locale) => ({
  title: locale === 'fr' ? 'Page introuvable' : 'Page Not Found',
  description: '404 Page',
  greeting: locale === 'fr' ? 'Ravi de vous rencontrer！' : 'Nice to meet you！',
  cdHome: 'cd /home',
  error: locale === 'fr' ? 'Erreur : Dossier introuvable！' : 'Error: Directory not found！',
  help: locale === 'fr' ? 'Commandes disponibles :' : 'Available commands:',
})

export const i18n = {
  get: (locale: Locale) => ({
    locale,
    siteConfig: getSiteConfig(locale),
    headerLinks: getHeaderLinks(locale),
    footerLinks: getFooterLinks(locale),
    socialLinks: getSocialLinks(),
    skillsConfig: getSkillsShowcaseConfig(),
    githubConfig: getGithubConfig(),
    postsConfig: getPostConfig(locale),
    tagsConfig: getTagsConfig(locale),
    projectsConfig: getProjectsConfig(locale),
    projectList: getProjectList(locale),
    githubContributionsConfig: getGithubContributionsConfig(locale),
    skillsHeaderConfig: getSkillsHeaderConfig(locale),
    postsHeaderConfig: getPostsHeaderConfig(locale),
    notFoundConfig: getNotFoundConfig(locale),
  }),
}

export { getSiteConfig, getPostConfig }
