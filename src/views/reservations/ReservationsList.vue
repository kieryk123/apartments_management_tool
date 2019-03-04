<template>
    <div class="page">
        <div class="page__heading">
            <h1 class="page__heading-title">Reservations list ({{ reservationsList.length }})</h1>
            <router-link
                class="btn btn--primary"
                to="/reservations/add"
            >+ Add new reservation</router-link>
        </div>
        <table class="table">
            <thead class="table__head">
                <tr class="table__row">
                    <th class="table__head-cell table__head-cell--darker">Apartment</th>
                    <th class="table__head-cell">Start date</th>
                    <th class="table__head-cell">End date</th>
                    <th class="table__head-cell">Profit</th>
                    <th class="table__head-cell">Customer</th>
                    <th class="table__head-cell"></th>
                </tr>
            </thead>
            <tbody class="table__body">
                <tr v-for="(reservation, index) in reservationsList" :key="index" class="table__row">
                    <th class="table__body-cell table__body-cell--name">
                        <img class="table__img" src="http://placehold.it/56x56" alt="">
                        <span class="table__info-wrapper">
                            <span class="table__main-text">{{ apartmentsList[reservation.apartmentId].name }}</span>
                            <span class="table__additional-text">{{ apartmentsList[reservation.apartmentId].address }}</span>
                        </span>
                    </th>
                    <th class="table__body-cell">{{ reservation.startDate | formatDate }}</th>
                    <th class="table__body-cell">{{ reservation.endDate | formatDate }}</th>
                    <th class="table__body-cell">
                    £{{
                        calculateProfit(
                            reservation.startDate,
                            reservation.endDate,
                            apartmentsList[reservation.apartmentId].pricePerNight
                        )
                    }}
                    </th>
                    <th class="table__body-cell">
                        <span class="table__info-wrapper">
                            <span class="table__main-text">{{ reservation.customer.firstName }} {{ reservation.customer.lastName }}</span>
                            <a :href="'tel:' + reservation.customer.phone" class="table__additional-text">{{ reservation.customer.phone }}</a>
                        </span>
                    </th>
                    <th class="table__body-cell">
                        <Dropdown
                            :menuItems="[
                                {
                                    title: 'Edit reservation',
                                    action: () => goToRoute('edit-reservation', index),
                                    strong: false
                                },
                                {
                                    title: 'Delete reservation',
                                    action: () => handleDeleteReservation(index),
                                    strong: true
                                }
                            ]"
                        />
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';

export default {
    data: () => ({

    }),
    methods: {
        handleDeleteReservation(id) {
            this.$store.dispatch('deleteReservation', id);
        },
        goToRoute(route, reservationId) {
            this.$router.push({ name: route, params: {reservationId: reservationId} });
        },
        calculateProfit(startDate, endDate, pricePerNight) {
            startDate = new Date(startDate);
            endDate = new Date(endDate);

            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            const profit = dayDiff * pricePerNight;

            return profit;
        }
    },
    computed: {
        reservationsList() {
            return this.$store.getters.reservationsList;
        },
        apartmentsList() {
            return this.$store.getters.apartmentsList;
        }
    },
    components: {
        Dropdown
    }
}
</script>

<style lang="scss">

</style>
