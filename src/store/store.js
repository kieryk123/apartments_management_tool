import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apartmentsList: [],
        reservationsList: []
    },
    mutations: {
        // apartments
        'GET_APARTMENTS'(state, payload) {
            state.apartmentsList = payload;
        },
        'ADD_APARTMENT'(state, payload) {
            state.apartmentsList.push(payload);
        },
        'DELETE_APARTMENT'(state, payload) {
            const filteredApartmentsList = state.apartmentsList.filter((el) => el.id !== payload);

            state.apartmentsList = filteredApartmentsList;
        },
        'EDIT_APARTMENT'(state, payload) {
            for (let i = 0; i < state.apartmentsList.length; i++) {
                if (state.apartmentsList[i].id == payload.id) {
                    state.apartmentsList[i].name = payload.name;
                    state.apartmentsList[i].address = payload.address;
                    state.apartmentsList[i].pricePerNight = payload.pricePerNight;
                    state.apartmentsList[i].imageObject = payload.imageObject;
                }
            }
        },
        // reservations
        'GET_RESERVATIONS'(state, payload) {
            state.reservationsList = payload;
        },
        'ADD_RESERVATION'(state, payload) {
            state.reservationsList.push(payload);
        },
        'DELETE_RESERVATION'(state, payload) {
            const filteredReservationsList = state.reservationsList.filter((el) => el.id !== payload);

            state.reservationsList = filteredReservationsList;
        },
        'EDIT_RESERVATION'(state, payload) {
            for (let i = 0; i < state.reservationsList.length; i++) {
                if (state.reservationsList[i].id == payload.id) {
                    state.reservationsList[i].apartmentId = payload.apartmentId;
                    state.reservationsList[i].customer.firstName = payload.customer.firstName;
                    state.reservationsList[i].customer.lastName = payload.customer.lastName;
                    state.reservationsList[i].customer.phone = payload.customer.phone;
                    state.reservationsList[i].startDate = payload.startDate;
                    state.reservationsList[i].endDate = payload.endDate;
                }
            }
        },
    },
    actions: {
        getApartments({commit}) {
            axios.get('/apartments.json')
                .then(res => {
                    const data = res.data;
                    let apartments = [];

                    for (let key in data) {
                        const apartment = data[key];
                        apartment.id = key;
                        apartments.push(apartment)
                    }

                    commit('GET_APARTMENTS', apartments);
                })
                .catch(err => console.log(err));
        },
        addApartment({commit}, apartment) {
            axios.post('/apartments.json', apartment)
                .then(res => {
                    apartment.id = res.data.name;
                    commit('ADD_APARTMENT', apartment);
                })
                .catch(err => console.log(err));
        },
        deleteApartment({commit}, id) {
            axios.delete(`/apartments/${id}.json/`)
                .then(res => {
                    commit('DELETE_APARTMENT', id);
                })
                .catch(err => console.log(err));
        },
        editApartment({commit}, data) {
            axios.put(`/apartments/${data.id}.json/`, data)
                .then(res => {
                    commit('EDIT_APARTMENT', data);
                })
                .catch(err => console.log(err));
        },
        getReservations({commit}) {
            axios.get('/reservations.json')
                .then(res => {
                    const data = res.data;
                    let reservations = [];

                    for (let key in data) {
                        const reservation = data[key];
                        reservation.id = key;
                        reservations.push(reservation)
                    }

                    commit('GET_RESERVATIONS', reservations);
                })
                .catch(err => console.log(err));
        },
        addReservation({commit}, reservation) {
            axios.post('/reservations.json', reservation)
                .then(res => {
                    reservation.id = res.data.name;
                    commit('ADD_RESERVATION', reservation);
                })
                .catch(err => console.log(err));
        },
        deleteReservation({commit}, id) {
            axios.delete(`/reservations/${id}.json/`)
                .then(res => {
                    commit('DELETE_RESERVATION', id);
                })
                .catch(err => console.log(err));
        },
        editReservation({commit}, data) {
            axios.put(`/reservations/${data.id}.json/`, data)
                .then(res => {
                    commit('EDIT_RESERVATION', data);
                })
                .catch(err => console.log(err));
        }
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
