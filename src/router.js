import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/reservations/ReservationsList.vue';
import ApartmentsList from './views/apartments/ApartmentsList.vue';
import AddApartment from './views/apartments/AddApartment.vue';
import ReservationsList from './views/reservations/ReservationsList.vue';
import AddReservation from './views/reservations/AddReservation.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/apartments',
            name: 'apartments',
            component: ApartmentsList
        },
        {
            path: '/apartments/add',
            name: 'add-apartment',
            component: AddApartment
        },
        {
            path: '/reservations',
            name: 'reservations',
            component: ReservationsList
        },
        {
            path: '/reservations/add',
            name: 'add-reservation',
            component: AddReservation
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
