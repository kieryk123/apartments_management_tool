import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apartmentsList: [],
        reservationsList: [
            {
                apartmentId: 0,
                startDate: 'Thu Dec 19 2019 00:00:00 GMT+0100 (Central European Standard Time)',
                endDate: 'Thu Dec 26 2019 00:00:00 GMT+0100 (Central European Standard Time)',
                customer: {
                    firstName: 'John',
                    lastName: 'Doe',
                    phone: '+48 694 180 362'
                }
            },
            {
                apartmentId: 1,
                startDate: 'Wed Dec 11 2019 00:00:00 GMT+0100 (Central European Standard Time)',
                endDate: 'Sat Dec 21 2019 00:00:00 GMT+0100 (Central European Standard Time)',
                customer: {
                    firstName: 'Paul',
                    lastName: 'Johan',
                    phone: '+48 884 888 366'
                }
            }
        ]
    },
    mutations: {
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
        'ADD_RESERVATION'(state, payload) {
            state.reservationsList.push(payload);
        },
        'DELETE_RESERVATION'(state, payload) {
            const filteredReservationsList = state.reservationsList.filter((el, index) => index !== payload);

            state.reservationsList = filteredReservationsList;
        },
        'EDIT_RESERVATION'(state, payload) {
            const id = payload.id;

            state.reservationsList[id].apartmentId = payload.apartmentId;
            state.reservationsList[id].customer.firstName = payload.customer.firstName;
            state.reservationsList[id].customer.lastName = payload.customer.lastName;
            state.reservationsList[id].customer.phone = payload.customer.phone;
            state.reservationsList[id].startDate = payload.startDate;
            state.reservationsList[id].endDate = payload.endDate;
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
        addReservation({commit}, reservation) {
            commit('ADD_RESERVATION', reservation);
        },
        deleteReservation({commit}, id) {
            commit('DELETE_RESERVATION', id);
        },
        editReservation({commit}, data) {
            commit('EDIT_RESERVATION', data);
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
