import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store/store';

// axios config
axios.defaults.baseURL = 'https://apartment-management-tool.firebaseio.com';

// global filters
import './filters/formatDate.js';
import './filters/formatMoney.js';

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        this.$store.dispatch('getApartments');
        this.$store.dispatch('getReservations');
    }
}).$mount('#app');
