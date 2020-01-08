<template>
    <div class="repos">
        <form class="repo-filter">
            <ul>
                <li>
                    Type
                    <select v-model="type">
                        <option value="">All</option>
                        <option value="owner">Owner</option>
                        <option value="collaborator">Collaborator</option>
                        <option value="forks">Forks</option>
                    </select>
                </li>

                <li>
                    Language
                    <select v-model="language">
                        <option value="">All</option>
                        <option
                            v-for="language in languages"
                            :value="language"
                            :key="language"
                            >{{ language }}</option
                        >
                    </select>
                </li>

                <li>
                    <button @click.prevent="reset">Reset</button>
                </li>
            </ul>
        </form>

        <div v-if="ownerRepos.length" class="repo-group">
            <h2>Owner ({{ ownerRepos.length }})</h2>

            <ul>
                <li v-for="repo in ownerRepos" :key="repo.id" class="repo">
                    <h3>
                        <a :href="repo.html_url">{{ repo.full_name }}</a>
                    </h3>

                    <ul class="meta">
                        <li>
                            <Icon name="clock" /> Updated
                            {{ vagueTime(new Date(repo.updated_at)) }}
                        </li>
                        <li v-if="repo.language">
                            <Icon name="circle" /> {{ repo.language }}
                        </li>
                        <li v-if="repo.stargazers_count">
                            <Icon name="star" /> {{ repo.stargazers_count }}
                        </li>
                        <li v-if="repo.forks">
                            <Icon name="code-branch" /> {{ repo.forks }}
                        </li>
                    </ul>

                    <p v-if="repo.description">{{ repo.description }}</p>
                </li>
            </ul>
        </div>

        <div v-if="collaboratorRepos.length" class="repo-group">
            <h2>Collaborator ({{ collaboratorRepos.length }})</h2>

            <ul>
                <li
                    v-for="repo in collaboratorRepos"
                    :key="repo.id"
                    class="repo"
                >
                    <h3>
                        <a :href="repo.html_url">{{ repo.full_name }}</a>
                    </h3>

                    <ul class="meta">
                        <li>
                            <Icon name="clock" /> Updated
                            {{ vagueTime(new Date(repo.updated_at)) }}
                        </li>
                        <li v-if="repo.language">
                            <Icon name="circle" /> {{ repo.language }}
                        </li>
                        <li v-if="repo.stargazers_count">
                            <Icon name="star" /> {{ repo.stargazers_count }}
                        </li>
                        <li v-if="repo.forks">
                            <Icon name="code-branch" /> {{ repo.forks }}
                        </li>
                    </ul>

                    <p v-if="repo.description">{{ repo.description }}</p>
                </li>
            </ul>
        </div>

        <div v-if="forksRepos.length" class="repo-group">
            <h2>Forks ({{ forksRepos.length }})</h2>

            <ul>
                <li v-for="repo in forksRepos" :key="repo.id" class="repo">
                    <h3>
                        <a :href="repo.html_url">{{ repo.full_name }}</a>
                    </h3>

                    <ul class="meta">
                        <li>
                            <Icon name="code-branch" /> Forked from
                            <a :href="repo.parent.html_url">{{
                                repo.parent.full_name
                            }}</a>
                        </li>
                        <li>
                            <Icon name="clock" /> Updated
                            {{ vagueTime(new Date(repo.updated_at)) }}
                        </li>
                        <li v-if="repo.language">
                            <Icon name="circle" /> {{ repo.language }}
                        </li>
                        <li v-if="repo.stargazers_count">
                            <Icon name="star" /> {{ repo.stargazers_count }}
                        </li>
                        <li v-if="repo.forks">
                            <Icon name="code-branch" /> {{ repo.forks }}
                        </li>
                    </ul>

                    <p v-if="repo.description">{{ repo.description }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import 'vue-awesome/icons/circle'
import 'vue-awesome/icons/clock'
import 'vue-awesome/icons/code-branch'
import 'vue-awesome/icons/star'
import Icon from 'vue-awesome/components/Icon'

import vagueTime from 'vague-time'

export default {
    components: {
        Icon,
    },
    computed: {
        collaboratorRepos() {
            return this.filteredRepos.filter(repo => {
                return repo.owner.login !== 'datashaman' && !repo.fork
            })
        },
        filteredRepos() {
            return this.repos.filter(repo => {
                let cond = true

                switch (this.type) {
                    case 'owner':
                        cond &= repo.owner.login === 'datashaman' && !repo.fork
                        break
                    case 'collaborator':
                        cond &= repo.owner.login !== 'datashaman' && !repo.fork
                        break
                    case 'forks':
                        cond &= repo.fork
                        break
                }

                switch (true) {
                    case this.language === 'Unknown':
                        cond &= repo.language === null
                        break
                    case this.language !== '':
                        cond &= repo.language === this.language
                        break
                }

                return cond
            })
        },
        forksRepos() {
            return this.filteredRepos.filter(repo => {
                return repo.fork
            })
        },
        languages() {
            let languages = this.repos.reduce((acc, repo) => {
                let language = repo.language || 'Unknown'
                acc[language] = true

                return acc
            }, {})

            return Object.keys(languages).sort()
        },
        ownerRepos() {
            return this.filteredRepos.filter(repo => {
                return repo.owner.login === 'datashaman' && !repo.fork
            })
        },
    },
    data() {
        const repos = require('../data/repos.json')

        return {
            type: '',
            language: '',
            repos: repos,
        }
    },
    methods: {
        reset() {
            this.type = this.language = ''
        },
        vagueTime(dt) {
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
.repo-filter li,
.meta li {
    display: inline-block;
    margin-right: 5px;
}
p {
    margin-top: 5px;
}
.meta {
    font-size: smaller;
    font-weight: 200;
}
</style>
