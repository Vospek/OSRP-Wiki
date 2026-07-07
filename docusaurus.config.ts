// docusaurus.config.ts
import { themes as prismThemes } from 'prism-react-renderer'
import type { Config }           from '@docusaurus/types'
import type * as Preset          from '@docusaurus/preset-classic'

const config: Config = {
  title:   'On-Site: Roleplay',
  tagline: 'On-Site: Roleplay — Official Knowledge Archive',
  favicon: 'img/favicon.ico',

  // 注入结构化数据 JSON-LD
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'On-Site: Roleplay — Official Knowledge Archive',
        url: 'https://osrpwiki.vospek.com/'
      }),
    },
  ],

  future: { v4: true },

  url:              'https://osrpwiki.vospek.com',
  baseUrl:          '/',
  organizationName: 'Vospek',
  projectName:      'Wiki',
  onBrokenLinks:    'warn',

  i18n: {
    defaultLocale: 'en',
    locales:       ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath:    './sidebars.ts',
          // 去掉 editUrl，不暴露 GitHub 源码链接
          editUrl:        undefined,
          // 显示文档最后更新时间
          showLastUpdateTime: true,
        },
        blog:  false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/tailwind.css'),
          ],
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 社交预览图
    image: 'img/social-card.jpg',

    // SEO Metadata
    metadata: [
      { name: 'keywords', content: 'On-Site, Roleplay, Roblox, SCP, Threshold Initiative, Wiki, Lore, RP' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:site_name', content: 'On-Site: Roleplay' },
      { property: 'og:locale', content: 'en_US' },
    ],

    // 强制深色模式，禁用切换按钮
    colorMode: {
      defaultMode:            'dark',
      disableSwitch:          true,
      respectPrefersColorScheme: false,
    },

    // ── Navbar ───────────────────────────────────────────────────
    navbar: {
      title: 'On-Site: Roleplay',
      logo: {
        alt: 'On-Site: Roleplay',
        src: 'img/logo.png',
      },
      style: 'dark',
      items: [
        {
          type:      'docSidebar',
          sidebarId: 'wikiSidebar',
          position:  'left',
          label:     'Archive',
        },
        {
          to:       '/docs/lore',
          label:    'Lore',
          position: 'left',
        },
        {
          to:       '/docs/rules',
          label:    'Rules',
          position: 'left',
        },
        {
          to:       '/docs/facility-protocols',
          label:    'Protocols',
          position: 'left',
        },
        {
          to:       '/docs/staff',
          label:    'Staff',
          position: 'left',
        },
        // 右侧
        {
          href:     'https://discord.gg/5kujGKDrr8',
          label:    'Discord',
          position: 'right',
        },
        {
          href:     'https://www.roblox.com/games/135415882857772',
          label:    'Play',
          position: 'right',
        },
      ],
    },

    // ── Footer ───────────────────────────────────────────────────
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Archive',
          items: [
            { label: 'Lore',               to:   '/docs/lore' },
            { label: 'Facility Protocols', to:   '/docs/facility-protocols' },
            { label: 'Clearance Levels',   to:   '/docs/clearance-levels' },
            { label: 'Rules',              to:   '/docs/rules' },
          ],
        },
        {
          title: 'Teams & Factions',
          items: [
            { label: 'Teams',              to:   '/docs/teams' },
            { label: 'Community Factions', to:   '/docs/faction' },
            { label: 'Chain of Oversight', to:   '/docs/staff' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord',            href: 'https://discord.gg/5kujGKDrr8' },
            { label: 'Roblox Game',        href: 'https://www.roblox.com/games/135415882857772' },
            { label: 'Roblox Group',       href: 'https://www.roblox.com/communities/1054225670/On-site-Roleplay-Community' },
          ],
        },
      ],
      copyright: [
        `Copyright © ${new Date().getFullYear()} On-Site: Roleplay.`,
        'All lore and content are original works of the On-Site: Roleplay development team.',
      ].join(' '),
    },

    // ── Code highlight ───────────────────────────────────────────
    prism: {
      theme:       prismThemes.vsDark,
      darkTheme:   prismThemes.vsDark,
      additionalLanguages: ['typescript', 'tsx', 'bash', 'json'],
    },

    // ── Docs ─────────────────────────────────────────────────────
    docs: {
      sidebar: {
        hideable:              true,
        autoCollapseCategories: true,
      },
    },

    // ── Announcement bar（可选） ──────────────────────────────────
    //announcementBar: {
     // id:              'wiki-status',
     // content:
       // '⚠ This wiki is actively being built. Some pages may be incomplete or placeholder only.',
     // backgroundColor: '#111111',
     // textColor:       '#888888',
     // isCloseable:     true,
    // },
  } satisfies Preset.ThemeConfig,

  // ── Plugins ──────────────────────────────────────────────────
  plugins: [
    // 如需 Tailwind，取消注释
       async function tailwindPlugin() {
         return {
           name: 'tailwind-plugin',
           configurePostCss(postcssOptions) {
             postcssOptions.plugins.push(require('@tailwindcss/postcss'))
             postcssOptions.plugins.push(require('autoprefixer'))
             return postcssOptions
           },
         }
       },
  ],
}

export default config