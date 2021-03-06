<template>
    <footer class="footer">
        <div class="footer-left-wrap">
            <ul class="contact" v-if="contact">
                <li
                    class="contact-item"
                    v-for="item in contact"
                    :key="item.text"
                >
                    <NavLink :link="item.link" :aria-label="item.text">
                        <component :is="item.iconComponent"></component>
                    </NavLink>
                </li>
            </ul>
        </div>

        <div class="footer-right-wrap">
            <ul class="copyright" v-if="copyright">
                <li
                    class="copyright-item"
                    v-for="item in copyright"
                    :key="item.text"
                >
                    <NavLink :link="item.link">{{ item.text }}</NavLink>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
import {
    CodepenIcon,
    FacebookIcon,
    GithubIcon,
    GitlabIcon,
    GlobeIcon,
    InstagramIcon,
    LinkedinIcon,
    MailIcon,
    MessageSquareIcon,
    PhoneIcon,
    TwitterIcon,
} from 'vue-feather-icons'

export default {
    components: {
        CodepenIcon,
        FacebookIcon,
        GithubIcon,
        GitlabIcon,
        GlobeIcon,
        InstagramIcon,
        LinkedinIcon,
        MailIcon,
        MessageSquareIcon,
        PhoneIcon,
        TwitterIcon,
    },

    methods: {
        getIconComponentName(contactType) {
            switch (contactType) {
                case 'codepen':
                    return 'CodepenIcon'
                case 'facebook':
                    return 'FacebookIcon'
                case 'github':
                    return 'GithubIcon'
                case 'gitlab':
                    return 'GitlabIcon'
                case 'instagram':
                    return 'InstagramIcon'
                case 'linkedin':
                    return 'LinkedinIcon'
                case 'mail':
                    return 'MailIcon'
                case 'messenger':
                    return 'MessageSquareIcon'
                case 'phone':
                    return 'PhoneIcon'
                case 'twitter':
                    return 'TwitterIcon'
                case 'web':
                    return 'GlobeIcon'
                default:
                    return ''
            }
        },
    },

    computed: {
        contact() {
            return (
                (this.$themeConfig.footer &&
                    this.$themeConfig.footer.contact) ||
                []
            )
                .map(({type, link}) => {
                    return {
                        iconComponent: this.getIconComponentName(type),
                        link,
                        text: type,
                    }
                })
                .filter(({iconComponent}) => iconComponent)
        },

        copyright() {
            return (
                (this.$themeConfig.footer &&
                    this.$themeConfig.footer.copyright) ||
                []
            )
        },
    },
}
</script>

<style lang="stylus" scoped>
ol, ul
  list-style none
  margin 0
  padding 0

.footer
  height 60px
  box-sizing border-box
  background-color #fffefa
  color #000
  display flex
  padding 15px 32px

  .footer-left-wrap
    line-height 30px
    flex 1
    display flex

    .contact
      display flex

      .contact-item
        flex 1
        margin-right 10px

        a
          font-size 12px
          color rgba(0, 0, 0, 0.45)
          text-decoration none
          transition color .3s

          &:hover
            color #000

  .footer-right-wrap
    flex 1
    display flex
    align-items center
    justify-content center

    @media(min-width: $MQNarrow)
      justify-content flex-end

    .copyright
      display flex
      justify-content flex-end

      .copyright-item
        flex 0 0 auto
        padding 0 10px
        position relative
        line-height 12px
        border-right 1px solid rgba(0, 0, 0, 0.6)

        &:last-child
          border-right none

        a
          font-size 12px
          color rgba(0, 0, 0, 0.6)
          text-decoration none
          transition color .3s

          &:hover
            color rgba(0, 0, 0, 0.9)

@media (max-width: $MQMobile)
  .footer
    height 100px
    flex-direction column

    .footer-left-wrap
      align-items center
      justify-content center
</style>
