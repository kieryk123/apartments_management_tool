import ReservationsService from '@/services/ReservationsService.js';

export const namespaced = true;

export const state = {
    reservationsList: []
};

export const mutations = {
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
};

export const actions = {
    getReservations({commit}) {
        ReservationsService.getReservations()
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
        ReservationsService.addReservation(reservation)
            .then(res => {
                reservation.id = res.data.name;
                commit('ADD_RESERVATION', reservation);
            })
            .catch(err => console.log(err));
    },
    deleteReservation({commit}, id) {
        ReservationsService.deleteReservation(id)
            .then(res => {
                commit('DELETE_RESERVATION', id);
            })
            .catch(err => console.log(err));
    },
    editReservation({commit}, data) {
        ReservationsService.editReservation(data.id, data)
            .then(res => {
                commit('EDIT_RESERVATION', data);
            })
            .catch(err => console.log(err));
    }
};

export const getters = {
    activeReservationsList(state) {
        const nowDate = new Date().toISOString();

        return state.reservationsList
                    .filter(el => new Date(el.endDate).toISOString() >= nowDate)
                    .sort((itemA, itemB) => new Date(itemA.startDate) > new Date(itemB.startDate));
    },
    expiredReservationsList(state) {
        const nowDate = new Date().toISOString();

        return state.reservationsList.filter(el => new Date(el.endDate).toISOString() < nowDate);
    },
    upcomingReservation(state, getters, rootState, rootGetters) {
        if (getters.activeReservationsList.length <= 0) {
            return false;
        }

        const today = new Date();
        const upcomingReservationsList = getters.activeReservationsList.filter(item => new Date(item.startDate) >= today);
        const closestReservation = upcomingReservationsList.reduce((itemA, itemB) => new Date(itemA.startDate) - today < new Date(itemB.startDate) - today ? itemA : itemB);
        const apartmentName = rootState.apartment.apartmentsList.find(apartment => apartment.id === closestReservation.apartmentId).name;

        const upcomingReservation = {
            apartmentName: apartmentName,
            startDate: closestReservation.startDate,
            endDate: closestReservation.endDate,
            customer: {
                firstName: closestReservation.customer.firstName,
                lastName: closestReservation.customer.lastName,
                phone: closestReservation.customer.phone
            }
        };

        return upcomingReservation;
    }
};
