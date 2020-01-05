<template>
  <ul class="repos">
    <li v-for="repo in repos" :key="repo.id" class="repo">
      <h2>
        <a :href="repo.html_url">{{ repo.name }}</a>
        <Icon v-if="repo.fork" name="code-branch"/>
      </h2>

      <p v-if="repo.description">{{ repo.description }}</p>

      <ul class="meta">
        <li><Icon name="clock"/> Updated {{ vagueTime(new Date(repo.updated_at)) }}</li>
        <li v-if="repo.fork && repo.parent"><Icon name="code-branch"/> Forked from <a :href="repo.parent.url">{{ repo.parent.name }}</a></li>
      </ul>
    </li>
  </ul>
</template>

<script>
import 'vue-awesome/icons/clock'
import 'vue-awesome/icons/code-branch'
import Icon from 'vue-awesome/components/Icon'

import vagueTime from 'vague-time'

export default {
  components: {
    Icon,
  },
  data () {
    return {
      repos: require('../data/repos.json'),
    }
  },
  methods: {
    vagueTime (dt) {
      return vagueTime.get({
        to: dt,
      })
    },
  },
}
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.meta {
  font-size: smaller;
  font-weight: 200;
}
</style>
