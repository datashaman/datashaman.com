<template>
    <div id="vuperess-theme-blog__global-layout">
        <Header />
        <MobileHeader
            :isOpen="isMobileHeaderOpen"
            @toggle-sidebar="isMobileHeaderOpen = !isMobileHeaderOpen"
        />
        <div class="content-wrapper" @click="isMobileHeaderOpen = false">
            <DefaultGlobalLayout />
        </div>
        <Card />
        <Footer />
    </div>
</template>

<script>
import GlobalLayout from '@app/components/GlobalLayout.vue'
import Header from '@theme/components/Header.vue'
import MobileHeader from '@theme/components/MobileHeader.vue'
import Card from '@theme/components/Card.vue'
import Footer from '@theme/components/Footer.vue'

export default {
    components: {
        DefaultGlobalLayout: GlobalLayout,
        Header,
        MobileHeader,
        Card,
        Footer,
    },

    data() {
        return {
            isMobileHeaderOpen: false,
        }
    },

    mounted() {
        this.$router.afterEach(() => {
            this.isMobileHeaderOpen = false
        })
    },
}
</script>

<style lang="stylus">
.content-wrapper
  padding 160px 15px 80px 15px
  min-height calc(100vh - 80px - 60px - 160px - 168px - 71px)
  max-width 740px
  margin 0 auto

@media (max-width: $MQMobile)
  .content-wrapper
    padding 100px 15px 20px 15px
    min-height calc(100vh - 20px - 60px - 100px - 168px - 71px)

#app
  a
    color #000
</style>
