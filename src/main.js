import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store/store';
import firebase from 'firebase/app';
import 'firebase/storage';
import { FIREBASE_KEY } from './API_KEYS';

// axios config
axios.defaults.baseURL = 'https://apartment-management-tool.firebaseio.com';

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: "apartment-management-tool.firebaseapp.com",
    databaseURL: "https://apartment-management-tool.firebaseio.com",
    projectId: "apartment-management-tool",
    storageBucket: "apartment-management-tool.appspot.com",
    messagingSenderId: "218484774777"
};

// global filters
import './filters/formatDate.js';
import './filters/formatMoney.js';

new Vue({
    router,
    store,
    render: h => h(App),
    beforeCreate() {
        this.$store.dispatch('apartment/getApartments');
        this.$store.dispatch('reservation/getReservations');
    },
    created() {
        firebase.initializeApp(firebaseConfig);
    }
}).$mount('#app');
