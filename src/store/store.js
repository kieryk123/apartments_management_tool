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
        }
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

                    return apartments;
                })
                .then(res => commit('GET_APARTMENTS', res))
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
                        reservations.push(reservation);
                    }

                    return reservations;
                })
                .then(res => commit('GET_RESERVATIONS', res))
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
        activeReservationsList(state) {
            return state.reservationsList.filter(el => el.endDate >= new Date().toISOString());
        },
        expiredReservationsList(state) {
            return state.reservationsList.filter(el => el.endDate < new Date().toISOString());
        },
        totalProfit(state) {
            let totalProfit = 0;

            if (
                state.reservationsList.length > 0 &&
                state.apartmentsList.length > 0
            ) {
                for (let i = 0; i < state.reservationsList.length; i++) {
                    const startDate = new Date(state.reservationsList[i].startDate);
                    const endDate = new Date(state.reservationsList[i].endDate);
                    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    const pricePerNight = state.apartmentsList.filter(el => el.id == state.reservationsList[i].apartmentId)[0].pricePerNight;
                    const profit = dayDiff * pricePerNight;

                    totalProfit += profit;
                }
            }

            return totalProfit;
        },
        actualMonthProfit(state) {
            const actualMonth = new Date().getMonth();
            const actualMonthResrvations = state.reservationsList.filter(el => {
                const reservationEndDate = new Date(el.endDate).getMonth();
                return reservationEndDate == actualMonth;
            });
            let actualMonthProfit = 0;

            if (
                actualMonthResrvations.length > 0 &&
                state.apartmentsList.length > 0
            ) {
                for (let i = 0; i < actualMonthResrvations.length; i++) {
                    const startDate = new Date(actualMonthResrvations[i].startDate);
                    const endDate = new Date(actualMonthResrvations[i].endDate);
                    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    const pricePerNight = state.apartmentsList.filter(el => el.id == actualMonthResrvations[i].apartmentId)[0].pricePerNight;
                    const profit = dayDiff * pricePerNight;

                    actualMonthProfit += profit;
                }
            }

            return actualMonthProfit;
        },
        previousMonthProfit(state) {
            let previousMonth = new Date().getMonth() - 1;
            previousMonth < 0 ? previousMonth = 11 : null;

            const previousMonthResrvations = state.reservationsList.filter(el => {
                const reservationEndDate = new Date(el.endDate).getMonth();
                return reservationEndDate == previousMonth;
            });
            let previousMonthProfit = 0;

            if (
                previousMonthResrvations.length > 0 &&
                state.apartmentsList.length > 0
            ) {
                for (let i = 0; i < previousMonthResrvations.length; i++) {
                    const startDate = new Date(previousMonthResrvations[i].startDate);
                    const endDate = new Date(previousMonthResrvations[i].endDate);
                    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    const pricePerNight = state.apartmentsList.filter(el => el.id == previousMonthResrvations[i].apartmentId)[0].pricePerNight;
                    const profit = dayDiff * pricePerNight;

                    previousMonthProfit += profit;
                }
            }

            return previousMonthProfit;
        }
    }
});
