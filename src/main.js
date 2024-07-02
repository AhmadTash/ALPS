import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import HomeView from './components/views/HomeView.vue';
import PostCreationView from './components/views/PostCreationView.vue';
import EditPostView from './components/views/EditPostView.vue';

const routes = [
    { path: '/', component: HomeView },
    { path: '/createPost', component: PostCreationView },
    { path: '/editPost', component: EditPostView}
];  

const router = createRouter({
    history: createWebHashHistory('/ALPS/'),  
    routes,
});

createApp(App)
    .use(router)
    .mount('#app');
