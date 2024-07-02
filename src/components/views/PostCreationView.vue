<script setup>
import { ref, computed, onUnmounted} from 'vue'
import { useTimer } from '../script/useTimer.js'
const post = ref({
  id: '',
  title: '',
  description: '',
  timeSpent: {minSpent: 0, secSpent: 0},
})

const props = defineProps({
    id:String, 
    
})

let postToEdit = null;

if(props.id) {
    const posts = JSON.parse(sessionStorage.getItem('posts')); 
    postToEdit = posts.find(post => post.id === parseInt(props.id)); 
    post.value = { ...postToEdit }; 

    
}

const BASE_URL = '/ALPS';



const { formattedTime, min, sec, postTimer, stopTimer, resetTimer} = useTimer(post.value.timeSpent.secSpent,post.value.timeSpent.minSpent);

function startClicked() {
    if(props.id){
        
        console.log("clicked")
        document.getElementById('savePostBtn').classList.remove('start-active')
    }
  postTimer()
  document.getElementById('start').classList.add('start-active')
  document.getElementById('saveTimer').classList.remove('start-active')
  document.getElementById('stop').classList.remove('stop-active')
}

function stopClicked() {
  stopTimer()
  document.getElementById('stop').classList.add('stop-active')
  document.getElementById('start').classList.remove('start-active')
}

function saveClicked(){
    stopTimer()
    document.getElementById('start').classList.add('start-active')
    document.getElementById('stop').classList.add('stop-active')
}


function savePost() {
    stopClicked()
  if(props.id){
    updatePost()
    resetTimer()
    window.location.href = `${BASE_URL}/`;
    return
  }else {
    post.value.id = generateId()
    post.value.timeSpent.minSpent = min.value
    post.value.timeSpent.secSpent = sec.value
const storedPosts = JSON.parse(sessionStorage.getItem('posts')) || [];
storedPosts.push({ ...post.value});

sessionStorage.setItem('posts', JSON.stringify(storedPosts));

post.value.title = ''
post.value.description = ''
post.value.timeSpent.minSpent = 0
post.value.timeSpent.secSpent = 0

resetTimer()
window.location.href = `${BASE_URL}/`;
  }
  
}


function generateId() {
  const storedPosts = JSON.parse(sessionStorage.getItem('posts')) || []
  const maxId = storedPosts.reduce((max, post) => (post.id > max ? post.id : max), 0)
  return maxId + 1
}


function updatePost() {
    const posts = JSON.parse(sessionStorage.getItem('posts')); 

    
    const updatedPosts = posts.map(postItem => {
        if (postItem.id === parseInt(props.id)) {
            return { ...postItem, ...post.value, timeSpent: {minSpent: min.value, secSpent: sec.value}}; 
        }
        return postItem; 
    });

   
    sessionStorage.setItem('posts', JSON.stringify(updatedPosts));
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}


const checkTitle = debounce(() => {
    const savePostBtn = document.getElementById('savePostBtn');

    if (post.value && postToEdit && post.value.title === postToEdit.title) {
        savePostBtn.classList.add('start-active');
    } else {
        savePostBtn.classList.remove('start-active');
    }
}, 10);

const checkDescription = debounce(() => {
    const savePostBtn = document.getElementById('savePostBtn');

    if (post.value && postToEdit && post.value.description === postToEdit.description) {
        savePostBtn.classList.add('start-active');
    } else {
        savePostBtn.classList.remove('start-active');
    }
}, 10);




    checkTitle()
    checkDescription()
    


</script>

<template>

<div class="postContainer">
        <form @submit.prevent="savePost" class="post">
            
            <div class="post-upperPart">
                <h2><input type="text" v-model="post.title" @input="checkTitle" placeholder="Enter Post Title" required></h2>
                <div id="postTimer" class="timerContainer">
                    
                    <input type="text" readonly class="timer" :value="'Time Spent: ' + formattedTime " required>
                    <div class="timerButtonsContainer">
                            <button id="start" class="buttons" type="button" style="background-color: #6ab04c;" @click="startClicked">{{ props.id? 'Continue': 'Start Timer' }}</button>
                            <button id="stop" class="buttons" type="button" style="background-color: rgb(244, 67, 54);" @click="stopClicked">Stop Timer</button>
                            <button id="saveTimer" class="buttons start-active" type="button" style="background-color: rgb(0, 140, 186);" @click="saveClicked">Save Timer</button>
                        </div>
                </div>
            </div>
            <hr style="width: 100%;">
            <div class="post-lowerPart">
                <p><textarea type="text" v-model="post.description" @input="checkDescription" placeholder="Enter Post Description" required></textarea></p>
                <button id="savePostBtn" class="buttons" style="background-color: #04AA6D;" type="submit"><i class="bi bi-floppy2-fill" style="margin-right: 8px;"></i>Save Post</button>
            </div>
            
        </form>
    </div>
    

</template>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/digital-7-mono');

    .post-upperPart h2{
        display: flex;
    }

    .post-lowerPart{
        justify-content: space-between;
    }

    input{
        background-color: transparent;
        border: none;
        color: white;
        font-size: 24px;
    }

    textarea{
        background-color: transparent;
        border: none;
        color: white;
        font-size: 24px;
        height: 100%;
        width: 100%;
    }

    .savePostButton{
    width: 100px;
    align-self: flex-end;
    
}

.timerButtonsContainer{
    display: flex;
    justify-content: space-evenly;
    gap: 20px;
}

.timerButtonsContainer .buttons{
    width: 95px;
    font-size: 10px;
}

.start-active,
.stop-active{
  pointer-events: none;
  opacity: 0.5;
}

input, textarea{
    padding: 10px;
    resize:none;
    color: black;
}

textarea{
    width: -webkit-fill-available;
}

@media (max-width: 768px){
    .timerContainer{
        height: 100px;
    }

    .post-lowerPart p {
        display: flex;
    width: 85%;
    margin-right: auto;
    margin-left: auto;
    }
    #savePostBtn{
        margin: 0 25px 20px 0;
    }

    .timerButtonsContainer{
        gap: 0;
    }

    .timerButtonsContainer .buttons{
        width: 75px;
        font-size: 10px;
    }

    .timer{
        padding-top: 0px;
    }

    h2 input{
        font-size: 20px;
        width: 100%;
    }
    textarea{
        font-size: 16px;
    }
}

</style>