<template>
  <div id="vuperess-theme-blog__post-layout">
    <div class="h-entry vuepress-blog-theme-content">
      <div>
        <a class="p-author h-card" href="https://www.datashaman.com">datashaman</a>
        posted
        <time class="dt-published" :datetime="published" :title="new Date($page.frontmatter.date)">{{ vagueTime($page.frontmatter.date) }}</time>
      </div>

      <h1 class="p-name">{{ $page.title }}</h1>

      <p v-if="$page.summary" class="p-summary">{{ $page.summary }}</p>

      <div class="e-content">
        <Content/>
      </div>
      <hr/>
      <Comment/>
    </div>
    <Toc/>
  </div>
</template>

<script>
  import Toc from '@theme/components/Toc.vue'
  import { Comment } from '@vuepress/plugin-blog/lib/client/components'
  import strftime from 'strftime'
  import vagueTime from 'vague-time'
  
  export default {
    components: {
      Toc,
      Comment,
    },
    computed: {
      published: function () {
        const dt = new Date(this.$page.frontmatter.date)

        return strftime('%FT%T%z')
      },
    },
    methods: {
        vagueTime(dt) {
            const params = {
                from: Date.now(),
                to: new Date(dt),
            }

            return vagueTime.get(params)
        },
    },
  }
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

  .vuepress-blog-theme-content
    @extend $wrapper
    font-size 16px
    letter-spacing 0px
    font-family PT Serif, Serif
    color #2c3e50
    position relative

    @media(min-width: $MQNarrow)
      box-shadow: 0 10px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.07)
  
</style>

<style src="prismjs/themes/prism-okaidia.css"></style>

