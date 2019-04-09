import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ApartmentsList from './views/apartments/ApartmentsList.vue';
import AddApartment from './views/apartments/AddApartment.vue';
import EditApartment from './views/apartments/EditApartment.vue';
import ReservationsList from './views/reservations/ReservationsList.vue';
import AddReservation from './views/reservations/AddReservation.vue';
import EditReservation from './views/reservations/EditReservation.vue';

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
            path: '/apartments/edit',
            name: 'edit-apartment',
            component: EditApartment,
            props: true,
            beforeEnter: (to, from, next) => to.params.apartmentId ? next() : next({ name: 'apartments' })
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
            path: '/reservations/edit',
            name: 'edit-reservation',
            component: EditReservation,
            props: true,
            beforeEnter: (to, from, next) => to.params.reservationId ? next() : next({ name: 'reservations' })
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
