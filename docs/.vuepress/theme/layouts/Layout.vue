<template>
  <div>
    <MyListLayout v-if="$pagination"/>
    <Content v-else/>
  </div>
</template>

<script>
import MyListLayout from '@theme/global-components/MyListLayout.vue'

<style src="prismjs/themes/prism-okaidia.css"></style>
