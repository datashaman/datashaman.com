<template>
    <footer class="card h-card">
        <div class="center">
            <a class="u-url" rel="me" href="https://datashaman.com">
                <img
                    class="p-name u-photo"
                    alt="Marlin Forbes"
                    src="/images/headshot.png"
                />
            </a>

            <div class="p-note">
                Freelance developer, open source solutions.
                <em>Wannabe writer</em>.
            </div>

            <a
                class="u-key"
                href="/datashaman.pgp"
                :value="key"
                title="pgp public key"
            >
                <KeyIcon />
            </a>
        </div>
    </footer>
</template>

<script>
import {KeyIcon} from 'vue-feather-icons'
import key from 'raw-loader!../../public/datashaman.pgp'

export default {
    components: {
        KeyIcon,
    },
    data() {
        return {
            key: key,
        }
    },
}
</script>

<style lang="stylus" scoped>
.card
  margin-bottom 40px
.center
  text-align center
.photo
  border-radius 50%
.p-note
  margin 10px 0
</style>
