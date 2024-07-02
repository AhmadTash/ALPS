<script setup>

import PostCreationView from './PostCreationView.vue'
const postId = new URLSearchParams(window.location.search).get('id')

</script>


<template>
    <PostCreationView :id="postId"/>
</template>


<style scoped>


</style>