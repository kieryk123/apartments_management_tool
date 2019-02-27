import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apartmentsList: [
            {
                name: 'Royal Apartment',
                address: '3810 Cronin Skyway',
                pricePerNight: 119
            },
            {
                name: 'Queen\'s House Apartment',
                address: '981 Arnoldo Crossroad',
                pricePerNight: 99
            },
            {
                name: 'Old City Apartment',
                address: '125 Time Square',
                pricePerNight: 189
            }
        ],
        reservationsList: [
            {
                apartmentId: 0,
                startDate: '19 Dec 2019',
                endDate: '26 Dec 2019',
                customer: {
                    firstName: 'John',
                    lastName: 'Doe',
                    phone: '+48 694 180 362'
                }
            },
            {
                apartmentId: 1,
                startDate: '11 Dec 2019',
                endDate: '21 Dec 2019',
                customer: {
                    firstName: 'Paul',
                    lastName: 'Johan',
                    phone: '+48 884 888 366'
                }
            }
        ]
    },
    mutations: {
        'ADD_APARTMENT'(state, payload) {
            state.apartmentsList.push(payload);
        },
        'DELETE_APARTMENT'(state, payload) {
            const filteredApartmentsList = state.apartmentsList.filter((el, index) => index !== payload);

            state.apartmentsList = filteredApartmentsList;
        },
        'ADD_RESERVATION'(state, payload) {
            state.reservationsList.push(payload);
        },
        'DELETE_RESERVATION'(state, payload) {
            const filteredReservationsList = state.reservationsList.filter((el, index) => index !== payload);

            state.reservationsList = filteredReservationsList;
        },
    },
    actions: {
        addApartment({commit}, apartment) {
            commit('ADD_APARTMENT', apartment);
        },
        deleteApartment({commit}, id) {
            commit('DELETE_APARTMENT', id);
        },
        addReservation({commit}, reservation) {
            commit('ADD_RESERVATION', reservation);
        },
        deleteReservation({commit}, id) {
            commit('DELETE_RESERVATION', id);
        },
    },
    getters: {
        apartmentsList(state) {
            return state.apartmentsList;
        },
        reservationsList(state) {
            return state.reservationsList;
        }
    }
});
