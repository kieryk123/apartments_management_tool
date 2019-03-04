import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

// global filters
Vue.filter('formatDate', (date) => {
    date = new Date(date);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
