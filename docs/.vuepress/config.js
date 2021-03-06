module.exports = {
  title: 'datashaman',
  description: 'Freelance developer, open source solutions. Wannabe writer.',
  head: [
    [
      'link',
      {
        rel: 'me',
        href: 'https://twitter.com/data_shaman',
      },
    ],
    [
      'link',
      {
        rel: 'me',
        href: 'https://github.com/datashaman',
      },
    ],
    [
      'link',
      {
        rel: 'pingback',
        href: 'https://webmention.io/datashaman.com/xmlrpc',
      },
    ],
    [
      'link',
      {
        rel: 'webmention',
        href: 'https://webmention.io/datashaman.com/webmention',
      },
    ],
    [
      'link',
      {
        rel: 'authorization_endpoint',
        href: 'https://indieauth.com/auth',
      },
    ],
    [
      'link',
      {
        rel: 'token_endpoint',
        href: 'https://tokens.indieauth.com/token',
      },
    ],
    [
      'link',
      {
        rel: 'micropub',
        href: 'https://micropub.datashaman.com',
      },
    ],
    [
      'link',
      {
        rel: 'pgpkey',
        href: '/datashaman.pgp',
        type: 'application/pgp-keys',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: '/site.webmanifest',
      },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
    [
      'link',
      {
        rel: 'code-repository',
        href: 'https://github.com/datashaman/micropub',
      },
    ],
    [
      'link',
      {
        rel: 'content-repository',
        href: 'https://github.com/datashaman/datashaman.com',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileColor',
        content: '#00aba9',
      },
    ],
    [
      'meta',
      {
        name: 'theme-color',
        content: '#ffffff',
      },
    ],
  ],
  theme: '@vuepress/blog',
  themeConfig: {
    footer: {
      copyright: [
        {
          text: '© 2019 datashaman',
          link: 'https://github.com/datashaman',
        },
        {
          text: 'Powered by VuePress',
          link: 'https://vuepress.vuejs.org/',
        },
      ],
      contact: [
        {
          type: 'twitter',
          link: 'https://twitter.com/data_shaman',
        },
        {
          type: 'github',
          link: 'https://github.com/datashaman',
        },
        {
          type: 'linkedin',
          link: 'https://www.linkedin.com/in/datashaman',
        },
        {
          type: 'codepen',
          link: 'https://codepen.io/datashaman',
        },
      ],
    },
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Tags',
        link: '/tags/',
      },
    ],
    summary: false,
  },
  plugins: [
    [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'post',
            dirname: '_posts',
            path: '/',
            frontmatter: {title: ''},
            itemLayout: 'Post',
            itemPermalink: '/:year/:month/:day/:slug',
          },
        ],
        frontmatters: [
          {
            id: 'tag',
            keys: ['tag', 'tags'],
            path: '/tags/',
            layout: 'Tag',
            frontmatter: {title: 'Tag'},
            itemlayout: 'Tag',
          },
        ],
      },
    ],
    [
      'feed',
      {
        canonical_base: 'https://datashaman.com',
      },
    ],
    [
      'sitemap',
      {
        exclude: ['/404.html'],
        hostname: 'https://datashaman.com',
      },
    ],
    [
      'minimal-analytics',
      {
        ga: 'UA-27952346-1',
      },
    ],
  ],
}
