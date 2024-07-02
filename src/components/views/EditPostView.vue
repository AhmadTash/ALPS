<script setup>
import PostCreationView from './PostCreationView.vue'


const params = new URLSearchParams(window.location.href.split('?')[1])
const postId = params.get('id')

</script>


<template>
    <PostCreationView :id="postId"/>
</template>


<style scoped>


</style>