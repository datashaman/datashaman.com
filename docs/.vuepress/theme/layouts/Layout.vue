<template>
    <div>
        <MyListLayout v-if="$pagination" />
        <Content v-else />
    </div>
</template>

<style src="prismjs/themes/prism-okaidia.css"></style>
