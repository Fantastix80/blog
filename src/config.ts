import type { GithubConfig, Link, PostConfig, Project, ProjectConfig, Site, SkillsShowcaseConfig, SocialLink, TagsConfig } from '~/types'

export const SITE: Site = {
  title: "Hell0W0rld's blog",
  subtitle: "A cybersecurity french student's blog",
  description1: "Hey ! I'm Jean a 4th year cybersecurity student. I have built a personal homelab (also working on a personnal SOC), CDSA certified and currently interested in CTFs. I work as a cybersecurity engineer so I will use this blog to track my journey into the IT world.",
  description2: "This will serve as a reminder for my future me but you might also find interesting stuff for you who knows ;)",
  website: 'https://blog.jeanvw.fr/',
  base: '/',
  author: 'Jean',
  ogImage: '/og-image.jpg',
}

export const HEADER_LINKS: Link[] = [
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Posts',
    url: '/posts',
  },
  {
    name: 'Projects',
    url: '/projects',
  },
  {
    name: 'Tags',
    url: '/tags',
  },
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
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

/**
 * SkillsShowcase 配置接口 / SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - 是否启用SkillsShowcase功能 / Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.direction - 技能展示方向 / Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - 技能图标 / Skills icon
 * @property {string} SKILLS_DATA.skills.name - 技能名称 / Skills name
 * get icon https://icon-sets.iconify.design/
 */
export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'Python',
          icon: 'icon-[mdi--language-python]',
        },
        {
          name: 'C',
          icon: 'icon-[mdi--language-c]',
        },
        {
          name: 'C++',
          icon: 'icon-[mdi--language-cpp]',
        },
        {
          name: 'Rust',
          icon: 'icon-[mdi--language-rust]',
        },
        {
          name: 'React',
          icon: 'icon-[mdi--react]',
        },
        {
          name: 'PHP',
          icon: 'icon-[mdi--language-php]',
        },
        {
          name: 'Java',
          icon: 'icon-[mdi--language-java]',
        },
        {
          name: 'Assembly',
          icon: 'icon-[mdi--code-tags]',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'PowerBI',
          icon: 'icon-[simple-icons--microsoft]',
        },
        {
          name: 'SQL',
          icon: 'icon-[simple-icons--mysql]',
        },
        {
          name: 'Intune',
          icon: 'icon-[simple-icons--microsoft]',
        },
        {
          name: 'MongoDB',
          icon: 'icon-[lineicons--mongodb]',
        },
        {
          name: 'EntraID',
          icon: 'icon-[simple-icons--microsoft]',
        },
        {
          name: 'Splunk',
          icon: 'icon-[simple-icons--splunk]',
        },
      ],
    },
    {
      direction: 'left',
      skills: [
        {
          name: 'Unreal Engine',
          icon: 'icon-[mdi--unreal]',
        },
        {
          name: 'Git',
          icon: 'icon-[mdi--git]',
        },
        {
          name: 'Binaryninja',
          icon: 'icon-[mdi--ninja]',
        },
        {
          name: 'Wireshark',
          icon: 'icon-[simple-icons--wireshark]',
        },
        {
          name: 'Linux',
          icon: 'icon-[mdi--linux]',
        },
        {
          name: 'ACL',
          icon: 'icon-[mdi--mountain-outline]',
        },
      ],
    },
  ],
}

/**
 * GitHub配置 / GitHub configuration
 *
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GITHUB用户名 / GitHub username
 * @property {boolean} TOOLTIP_ENABLED - 是否开启Tooltip功能 / Whether to enable Github Tooltip features
 */

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'Fantastix80',
  TOOLTIP_ENABLED: true,
}

export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: "Here, I am sure you will find something interesting for you ^^",
  introduce: "Here, I am sure you will find something interesting for you ^^",
  author: 'Jean',
  homePageConfig: {
    size: 5,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  defaultHeroImage: '/og-image.jpg',
  defaultHeroImageAspectRatio: '16/9',
  imageDarkenInDark: true,
  readMoreText: 'Read more',
  prevPageText: 'Previous',
  nextPageText: 'Next',
  tocText: 'On this page',
  backToPostsText: 'Back to Posts',
  nextPostText: 'Next Post',
  prevPostText: 'Previous Post',
}

export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: 'All the tags for posts are here, you can click to filter them.',
  introduce: 'All the tags for posts are here, you can click to filter them.',
}

export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: 'Here are some examples of my projects.',
  introduce: 'Here are some examples of my projects.',
}

// get icon https://icon-sets.iconify.design/
export const ProjectList: Project[] = [
  {
    name: "Portfolio",
    description: "My personnal portfolio built in 2022.",
    website: 'https://jeanvw.fr',
    type: 'image',
    icon: '/projects/logo.png',
  },
  {
    name: "Pokemon",
    description: "A case-opening like website. Your goal is to be in the top leaderboard !",
    website: 'https://pokemon.jeanvw.fr',
    type: 'image',
    icon: '/projects/logo.png',
  },
  /*{
    name: "Litos",
    description: "A simple and modern blog.",
    githubUrl: 'https://github.com/Fantastix80',
    website: 'https://blog.jeanvw.fr',
    type: 'image',
    icon: '/projects/logo.png',
    star: 11,
    fork: 4,
  },*/
]
