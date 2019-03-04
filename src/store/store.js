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
        'ADD_APARTMENT'(state, payload) {
            state.apartmentsList.push(payload);
        },
        'DELETE_APARTMENT'(state, payload) {
            const filteredApartmentsList = state.apartmentsList.filter((el, index) => index !== payload);

            state.apartmentsList = filteredApartmentsList;
        },
        'EDIT_APARTMENT'(state, payload) {
            const id = payload.id;

            state.apartmentsList[id].name = payload.name;
            state.apartmentsList[id].address = payload.address;
            state.apartmentsList[id].pricePerNight = payload.pricePerNight;
            state.apartmentsList[id].imageObject = payload.imageObject;
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
            state.reservationsList[id].firstName = payload.firstName;
            state.reservationsList[id].lastName = payload.lastName;
            state.reservationsList[id].startDate = payload.startDate;
            state.reservationsList[id].endDate = payload.endDate;
            state.reservationsList[id].contactNumber = payload.contactNumber;
        },
    },
    actions: {
        addApartment({commit}, apartment) {
            commit('ADD_APARTMENT', apartment);
        },
        deleteApartment({commit}, id) {
            commit('DELETE_APARTMENT', id);
        },
        editApartment({commit}, data) {
            commit('EDIT_APARTMENT', data);
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
