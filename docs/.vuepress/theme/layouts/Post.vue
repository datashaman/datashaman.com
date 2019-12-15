<template>
  <div id="vuperess-theme-blog__post-layout">
    <div class="h-entry vuepress-blog-theme-content">
      <h1 class="ui-post-title">
        <span class="p-name">{{ $page.title }}</span>

        <span class="metadata">
            <a class="p-author h-card" href="https://www.datashaman.com">datashaman</a>
            posted
            <a class="u-url" :href="$page.path">
                <time class="dt-published" :datetime="published" :title="new Date($page.frontmatter.date)">{{ vagueTime($page.frontmatter.date) }}</time>
            </a>
        </span>
      </h1>

      <p v-if="$page.frontmatter.summary" class="p-summary">{{ $page.frontmatter.summary }}</p>

      <div class="e-content">
        <Content/>
      </div>
      <!--
      <hr/>
      <Comment/>
      -->
    </div>
    <Toc/>
  </div>
</template>

<script>
  import Card from '@theme/components/Card.vue'
  import Toc from '@theme/components/Toc.vue'
  import { Comment } from '@vuepress/plugin-blog/lib/client/components'
  import strftime from 'strftime'
  import vagueTime from 'vague-time'
  
  export default {
    components: {
      Card,
      Comment,
      Toc,
    },
    computed: {
      published: function () {
        return strftime('%FT%T%z', new Date(this.$page.frontmatter.date))
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

.metadata
    font-size small
    color #999
</style>

<style src="prismjs/themes/prism-okaidia.css"></style>

