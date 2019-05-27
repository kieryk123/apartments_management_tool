import Vue from 'vue';
import Vuex from 'vuex';
import * as apartment from '@/store/modules/apartment.js';
import * as reservation from '@/store/modules/reservation.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        apartment,
        reservation
    },
    getters: {
        totalProfit(state) {
            let totalProfit = 0;

            if (
                reservation.state.reservationsList.length > 0 &&
                apartment.state.apartmentsList.length > 0
            ) {
                for (let i = 0; i < reservation.state.reservationsList.length; i++) {
                    const startDate = new Date(reservation.state.reservationsList[i].startDate);
                    const endDate = new Date(reservation.state.reservationsList[i].endDate);
                    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    const pricePerNight = apartment.state.apartmentsList.filter(el => el.id == reservation.state.reservationsList[i].apartmentId)[0].pricePerNight;
                    const profit = dayDiff * pricePerNight;

                    totalProfit += profit;
                }
            }

            return totalProfit;
        },
        actualMonthProfit(state) {
            const actualMonth = new Date().getMonth();
            const actualMonthResrvations = reservation.state.reservationsList.filter(el => {
                const reservationEndDate = new Date(el.endDate).getMonth();
                return reservationEndDate == actualMonth;
            });
            let actualMonthProfit = 0;

            if (
                actualMonthResrvations.length > 0 &&
                apartment.state.apartmentsList.length > 0
            ) {
                for (let i = 0; i < actualMonthResrvations.length; i++) {
                    const startDate = new Date(actualMonthResrvations[i].startDate);
                    const endDate = new Date(actualMonthResrvations[i].endDate);
                    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    const pricePerNight = apartment.state.apartmentsList.filter(el => el.id == actualMonthResrvations[i].apartmentId)[0].pricePerNight;
                    const profit = dayDiff * pricePerNight;

                    actualMonthProfit += profit;
                }
            }

            return actualMonthProfit;
        },
        previousMonthProfit(state) {
            let previousMonth = new Date().getMonth() - 1;
            previousMonth < 0 ? previousMonth = 11 : null;

            const previousMonthResrvations = reservation.state.reservationsList.filter(el => {
                const reservationEndDate = new Date(el.endDate).getMonth();
                return reservationEndDate == previousMonth;
            });
            let previousMonthProfit = 0;

            if (
                previousMonthResrvations.length > 0 &&
                apartment.state.apartmentsList.length > 0
            ) {
                for (let i = 0; i < previousMonthResrvations.length; i++) {
                    const startDate = new Date(previousMonthResrvations[i].startDate);
                    const endDate = new Date(previousMonthResrvations[i].endDate);
                    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    const pricePerNight = apartment.state.apartmentsList.filter(el => el.id == previousMonthResrvations[i].apartmentId)[0].pricePerNight;
                    const profit = dayDiff * pricePerNight;

                    previousMonthProfit += profit;
                }
            }

            return previousMonthProfit;
        }
    }
});
