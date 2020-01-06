<template>
  <div class="repos">
    <h2>Owner</h2>

    <ul>
        <li v-for="repo in ownerRepos" :key="repo.id" class="repo">
        <h3>
            <a :href="repo.html_url">{{ repo.full_name }}</a>
        </h3>

        <ul class="meta">
            <li><Icon name="clock"/> Updated {{ vagueTime(new Date(repo.updated_at)) }}</li>
        </ul>

        <p v-if="repo.description">{{ repo.description }}</p>
        </li>
    </ul>

    <h2>Collaborator</h2>

    <ul>
        <li v-for="repo in collaboratorRepos" :key="repo.id" class="repo">
        <h3>
            <a :href="repo.html_url">{{ repo.full_name }}</a>
        </h3>

        <ul class="meta">
            <li><Icon name="clock"/> Updated {{ vagueTime(new Date(repo.updated_at)) }}</li>
        </ul>

        <p v-if="repo.description">{{ repo.description }}</p>
        </li>
    </ul>

    <h2>Forked</h2>

    <ul>
        <li v-for="repo in forkedRepos" :key="repo.id" class="repo">
        <h3>
            <a :href="repo.html_url">{{ repo.full_name }}</a>
        </h3>

        <ul class="meta">
            <li><Icon name="code-branch"/> Forked from <a :href="repo.parent.url">{{ repo.parent.full_name }}</a></li>
            <li><Icon name="clock"/> Updated {{ vagueTime(new Date(repo.updated_at)) }}</li>
        </ul>

        <p v-if="repo.description">{{ repo.description }}</p>
        </li>
    </ul>

  </div>
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
  computed: {
    collaboratorRepos () {
      return this.repos.filter(repo => {
        return repo.owner.login !== 'datashaman' && !repo.fork
      })
    },
    forkedRepos () {
      return this.repos.filter(repo => {
        return repo.fork
      })
    },
    ownerRepos () {
      return this.repos.filter(repo => {
        return repo.owner.login === 'datashaman' && !repo.fork
      })
    },
  },
  data () {
    const repos = require('../data/repos.json')

    return {
      repos: repos,
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
.meta {
  font-size: smaller;
  font-weight: 200;
}
</style>
