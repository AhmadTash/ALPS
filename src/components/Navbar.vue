<script setup>
</script>

<template>
    <div class="navbarContainer">
        <div class="navbar">
            <h2 class="title">ALPES - CRUD Posts Task</h2>
            <nav>
    <ul>
      <li>
        <router-link to="/"><i class="bi bi-house" style="margin-right: 8px; color: white;"></i>Home</router-link>
      </li>
      <li>
        <router-link to="/createPost"><span><i class="bi bi-plus-square" style="color: white; margin-right: 8px;"></i></span>Create a new post</router-link>
      </li>
    </ul>
  </nav>
        </div>
    </div>
</template>

<style scoped>

.navbarContainer{
    background-color: white;
    margin:0;
    padding:0;
    margin-bottom: 40px;
    box-shadow:rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

.navbarContainer *{
    color: black;
}

.title{
    display: flex;
    align-items: center;
    font-size: 16px;
    border: 1px solid black;
    padding: 0 10px;
}

.navbar{
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: auto;
}

nav{
    display: flex;
    align-items: center;
}

ul{
    display: flex;
    list-style-type: none;
    gap: 20px;    
}

ul li{
    display: flex;
    align-items: center;
}

a{
    text-decoration: none;
    color:white;
}


@media (max-width: 768px){
    .navbar{
        width: 82%;
        flex-direction: column;
    }
    .navbar h2, nav{
        justify-content: center;
    }
    ul{
        padding: 0;
    }

    li a {
        padding: 10px;
    background: black;
    color: white !important;
    }
}

</style>