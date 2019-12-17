<template>
    <div id="vuperess-theme-blog__post-layout">
        <div class="h-entry vuepress-blog-theme-content">
            <h1 class="ui-post-title">
                <span class="p-name">{{ $page.title }}</span>

                <span class="metadata">
                    <a class="p-author h-card" href="https://www.datashaman.com"
                        >datashaman</a
                    >
                    posted
                    <a class="u-url" :href="$page.path">
                        <time
                            class="dt-published"
                            :datetime="published"
                            :title="new Date($page.frontmatter.date)"
                            >{{ vagueTime($page.frontmatter.date) }}</time
                        >
                    </a>
                </span>
            </h1>

            <p v-if="$page.frontmatter.summary" class="p-summary">
                {{ $page.frontmatter.summary }}
            </p>

            <div class="e-content">
                <Content />
            </div>

            <ul class="tags" v-if="$page.frontmatter.tags.length">
                <li class="tag" v-for="tag in $page.frontmatter.tags">
                    <a :href="'/tags/' + tag" :title="tag">#{{ tag }}</a>
                </li>
            </ul>

            <Mentions />
        </div>
        <Toc />
    </div>
</template>

<script>
import Mentions from '@theme/components/Mentions.vue'
import Toc from '@theme/components/Toc.vue'
import strftime from 'strftime'
import vagueTime from 'vague-time'

export default {
    components: {
        Mentions,
        Toc,
    },
    computed: {
        published: function() {
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
.metadata
    font-size small
    color #666
.tags
    list-style none
    padding 0
.tag
    display inline-block
    margin-right 10px
</style>

<style src="prismjs/themes/prism-okaidia.css"></style>
