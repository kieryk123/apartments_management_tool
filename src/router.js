import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('./views/Home.vue');
const ApartmentsList = () => import('./views/apartments/ApartmentsList.vue');
const AddApartment = () => import('./views/apartments/AddApartment.vue');
const EditApartment = () => import('./views/apartments/EditApartment.vue');
const ReservationsList = () => import('./views/reservations/ReservationsList.vue');
const AddReservation = () => import('./views/reservations/AddReservation.vue');
const EditReservation = () => import('./views/reservations/EditReservation.vue');

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
