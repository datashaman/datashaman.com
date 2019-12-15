<template>
    <div v-if="mentions.length" class="mentions">
        <ul>
            <li v-for="mention in mentions" class="mention u-comment h-cite">
                <div class="u-author pure-g">
                    <div class="pure-u-1-12">
                        <img class="mention-photo u-photo" :src="mention.data.author.photo" :title="mention.data.author.name"/>
                    </div>
                    <div class="mention-card pure-u-11-12">
                        <a class="u-author h-card" :href="mention.data.author.url">{{ mention.data.author.name }}</a>
                        <span class="commented muted">{{ activities[mention.activity.type] }}</span>
                        <a class="u-url muted" :href="mention.source">
                            <time class="dt-published" :datetime="mention.verified_date" :title="new Date(mention.verified_date)">{{ vagueTime(mention.data.published) }}</time>
                        </a>
                        <p v-if="mention.data.content" class="p-content" v-html="mention.data.content"/>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import jsonp from 'jsonp'
import vagueTime from 'vague-time'

export default {
    data() {
        return {
            activities: {
                like: 'liked this',
                link: 'linked to this',
                repost: 'reposted this',
                reply: 'replied to this',
            },
            mentions: [],
        }
    },
    mounted() {
        jsonp("https://webmention.io/api/mentions?per-page=50&page=0&target=" + encodeURIComponent(window.location.href), {
            param: 'jsonp',
        }, (err, data) => {
            if (err) {
                console.error(err)
            } else {
                this.mentions = data.links
            }
        })
    },
    methods: {
        vagueTime: function (dt) {
            const params = {
                from: Date.now(),
                to: new Date(dt),
            }

            return vagueTime.get(params)
        }
    }
}
</script>

<style scoped>
.mentions {
    padding-top: 15px;
    margin-top: 10px;
    border-top: 1px solid #AEADAD;
    border-bottom: 1px solid #AEADAD;
    font-size: 16px;
}

.mentions ul {
    list-style: none;
    padding: 0;
    margin-left: 0;
}
</style>
