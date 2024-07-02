<script setup>
import Post from '../Post.vue'


const posts = JSON.parse(sessionStorage.getItem('posts')) || []
</script>


<template>
   
    <div class="postsContainer">
        
        
            <Post v-if="posts" v-for="(post, index) in posts" :key="index" :id="post.id" :title="post.title" :description="post.description" :timeSpent="post.timeSpent"/>
        
            <div v-if="!posts.length" class="noPostsContainer">
                <h1 style="margin-top: 0;">No Posts to show</h1>
                <a href="/createPost" style="color: black;">Click here to add your first post !</a>
            </div>
        
        
    </div>

</template>


<style scoped>

.postsContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

.noPostsContainer{
    color: black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    
    padding: 55px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

@media (max-width: 768px){
    .noPostsContainer{
        padding: 45px;
    }
}

</style>