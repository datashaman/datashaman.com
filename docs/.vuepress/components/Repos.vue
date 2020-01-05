<template>
  <ul class="repos">
    <li v-for="repo in repos" :key="repo.id" class="repo">
      <h3>
        <a :href="repo.html_url">{{ repo.full_name }}</a>
        <Icon v-if="repo.fork" name="code-branch"/>
      </h3>

      <ul class="meta">
        <li><Icon name="clock"/> Updated {{ vagueTime(new Date(repo.updated_at)) }}</li>
        <li v-if="repo.fork && repo.parent"><Icon name="code-branch"/> Forked from <a :href="repo.parent.url">{{ repo.parent.name }}</a></li>
      </ul>

      <p v-if="repo.description">{{ repo.description }}</p>
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
h3 {
  margin-bottom: 5px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
p {
  margin-top: 5px;
}
.meta li {
  display: inline-block;
  margin-right: 5px;
}
.meta {
  font-size: smaller;
  font-weight: 200;
}
</style>
