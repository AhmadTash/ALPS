<script setup>
import { defineProps, computed } from 'vue'
const props= defineProps({
    id: String,
    title: String,
    description: String,
    timeSpent: Object
}
)

const formattedTime = computed(() => {
  const min = props.timeSpent.minSpent;
  const sec = props.timeSpent.secSpent;
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
});


function deletePost(){
    const storedPosts = JSON.parse(sessionStorage.getItem('posts')) || []
    const updatedPosts = storedPosts.filter(post => post.id !== props.id)
    sessionStorage.setItem('posts', JSON.stringify(updatedPosts))
    location.reload()
}



</script>

<template>

    <div class="postContainer">
        <div class="post">
            <div class="post-upperPart">
                <h2>{{title}}</h2>
                <div class="timerContainer">
                    <p class="timer">Time Spent: {{formattedTime}} </p>
                </div>
            </div>
            <hr style="width: 100%;">
            <div class="post-lowerPart">
                <p class="postDescription">{{description}}</p>
                <div class="postButtons">
                    <a style="background-color: #008CBA; width: 80px;" class="buttons" :href="'/editPost?id=' + id"><i class="bi bi-pencil-fill" style="margin-right: 8px;"></i>Edit Post</a>
                    <button style="background-color: #f44336;" class="buttons" @click="deletePost"><i class="bi bi-trash-fill" style="margin-right: 8px;"></i>Delete Post</button>
                </div>
            </div>
            
        </div>
    </div>

</template>


<style>

.post{
    display: flex;
    flex-direction: column;
    height: 100%
}

.post-upperPart{
        display: flex;
        
        justify-content: space-between;
        margin-bottom: 15px;

    }

.post-upperPart h2{
    margin-top: 10px;
    margin-bottom: 10px;
}

.timerContainer{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.timer{
    font-family: 'Digital-7';
    font-weight: 700;
    text-align: center;
    font-size: 24px;
    margin-top: 0px;
    margin-bottom: 0px;
    outline: 0;
}

.postContainer{
    border: 1px solid white;
    width: 70%;
    height: 370px;
    margin: auto;
    border-radius: 6px;
    background-color: white;
    color: black;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.post-lowerPart{
    display: flex;
    flex-direction: column;
    height: 100%;
}

.postDescription{
    height: 100%;
}

.postButtons{
    display: flex;
    justify-content: end;
    gap: 20px;
}

.buttons {
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 13px;
    cursor: pointer;
    width: 110px;
    align-self: flex-end;
    text-align: center;
    text-decoration: none;
}


@media (max-width: 768px){
    .post-upperPart{
        margin-bottom: 0px;
        flex-direction: column;
    }

    .post-upperPart h2{
        order:2;
        width: 85%;
    margin-right: auto;
    margin-left: auto;
    }

    hr{
        width: 85% !important;
        margin-top: 0;
    margin-bottom: 0;
    }

    .post-lowerPart .postDescription{
        width: 85%;
    margin-right: auto;
    margin-left: auto;
    }
    .post-upperPart .timerContainer{
        order: 1;
    }

    .postButtons{
        justify-content: center;
        margin-bottom: 22px;
        margin-right: auto;
    margin-left: auto;
    width: 85%;
    }
    .postContainer{
        width: 80%;
        padding: 0;
    }

    .timerContainer{
        background-color: black;
        border-radius: 6px 6px 0 0;
        height: 50px;
    }
    .timer{
        color: white !important;
    }
}

</style>