import { createRouter, createWebHistory } from 'vue-router';
import home from '../pages/dashboard/home.vue';
import formCreate from '../pages/dashboard/form/create.vue';
import formList from '../pages/dashboard/form/index.vue';


const routes = [
    {
        path: '/',
        name: 'Home',
        component: home
    },
    {
        path: '/form/create',
        name: 'formCreate',
        component: formCreate
    },
    {
        path: '/form/list',
        name: 'formList',
        component: formList
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes
  });

export default router;