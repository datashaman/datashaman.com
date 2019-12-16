<template>
    <div id="base-list-layout">
        <div class="ui-posts">
            <div
                class="h-entry ui-post"
                v-for="page in pages"
                :key="page.title"
            >
                <h1 class="ui-post-title">
                    <NavLink class="p-name u-url" :link="page.path">{{
                        page.title
                    }}</NavLink>

                    <span class="metadata">
                        <a
                            class="p-author h-card"
                            href="https://www.datashaman.com"
                            >datashaman</a
                        >
                        posted
                        <a class="u-url" :href="page.path">
                            <time
                                class="dt-published"
                                :datetime="published"
                                :title="new Date(page.frontmatter.date)"
                                >{{ vagueTime(page.frontmatter.date) }}</time
                            >
                        </a>
                    </span>
                </h1>

                <div class="p-summary ui-post-summary">
                    {{ page.frontmatter.summary || page.summary }}
                    <!-- <Content :page-key="page.key" slot-key="intro"/>-->
                </div>

                <div class="ui-post-author" v-if="page.frontmatter.author">
                    <NavigationIcon />
                    <span
                        >{{ page.frontmatter.author }} in
                        {{ page.frontmatter.location }}</span
                    >
                </div>
            </div>
        </div>

        <component
            v-if="$pagination.length > 1 && paginationComponent"
            :is="paginationComponent"
        ></component>
    </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from 'vue'
import {NavigationIcon, ClockIcon} from 'vue-feather-icons'
import {
    Pagination,
    SimplePagination,
} from '@vuepress/plugin-blog/lib/client/components'
import strftime from 'strftime'
import vagueTime from 'vague-time'

export default {
    components: {NavigationIcon, ClockIcon},

    data() {
        return {
            paginationComponent: null,
        }
    },

    created() {
        this.paginationComponent = this.getPaginationComponent()
    },

    computed: {
        pages() {
            return this.$pagination.pages
        },
        published: function() {
            return strftime('%FT%T%z', new Date(this.$page.frontmatter.date))
        },
    },

    methods: {
        getPaginationComponent() {
            const n = THEME_BLOG_PAGINATION_COMPONENT
            if (n === 'Pagination') {
                return Pagination
            }

            if (n === 'SimplePagination') {
                return SimplePagination
            }

            return Vue.component(n) || Pagination
        },

        resovlePostDate(date) {
            return new Date(date.replace(/-/g, '/').trim()).toDateString()
        },

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
.common-layout
  .content-wrapper
    padding-bottom 80px

.ui-post
  padding-bottom 25px
  margin-bottom 25px
  border-bottom 1px solid #f1f1f1

  &:last-child
    border-bottom 0px
    margin-bottom 0px

  p
    margin 0

.ui-post-title
  font-family PT Serif, Serif
  font-size 28px
  border-bottom 0

  a
    cursor pointer
    color #000
    transition all .2s
    text-decoration none

    &:hover
      text-decoration underline

.ui-post-author
  display flex
  align-items center
  font-size 12px
  line-height 12px
  color rgba(0, 0, 0, 0.84)
  margin-bottom 3px
  font-weight 400

  svg
    margin-right 5px
    width 14px
    height 14px

.ui-post-date
  display flex
  align-items center
  font-size 12px
  color rgba(0, 0, 0, 0.54)
  font-weight 200

  svg
    margin-right 5px
    width 14px
    height 14px

.metadata
  font-size small
  color #999
</style>

<style src="prismjs/themes/prism-okaidia.css"></style>
