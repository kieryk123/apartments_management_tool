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
                    <th class="table__body-cell">{{ reservation.startDate }}</th>
                    <th class="table__body-cell">{{ reservation.endDate }}</th>
                    <th class="table__body-cell">£{{ 'xxx' }}</th>
                    <th class="table__body-cell">
                        <span class="table__info-wrapper">
                            <span class="table__main-text">{{ reservation.customer.firstName }} {{ reservation.customer.lastName }}</span>
                            <a :href="'tel:' + reservation.customer.phone" class="table__additional-text">{{ reservation.customer.phone }}</a>
                        </span>
                    </th>
                    <th class="table__body-cell">
                        <Dropdown
                            :menuItems="[
                                {title: 'Edit reservation', route: '/apartments/edit', strong: false},
                                {title: 'Delete reservation', action: () => handleDeleteReservation(index), strong: true}
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
