<template>
    <footer class="card h-card vcard">
        <div class="center">
            <a class="u-url url" href="http://www.datashaman.com">
                <img class="p-name fn u-photo photo" alt="Marlin Forbes" src="/images/headshot.png"/>
            </a>

            <div class="p-note">Freelance developer, open source solutions.</div>

            <a class="u-key" href="/datashaman.pgp" :value="key">public key</a>
        </div>
    </footer>
</template>

<script>
import key from 'raw-loader!../../public/datashaman.pgp'

export default {
    data() {
        return {
            key: key
        }
    }
}
</script>

<style lang="stylus" scoped>
.card
  margin-bottom 40px
.center
  text-align center
.photo
  border-radius 50%
</style>
