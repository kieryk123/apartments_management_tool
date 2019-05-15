<template>
    <div v-if="dataIsLoaded" class="page">
        <div class="page__heading">
            <h1 class="page__heading-title">Reservations list ({{ activeReservationsList.length }})</h1>
            <router-link
                class="btn btn--primary"
                to="/reservations/add"
            >+ Add new reservation</router-link>
        </div>
        <div class="table-wrapper">
            <ReservationsTable :data="activeReservationsList"/>
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<script>
import ReservationsTable from '@/components/ReservationsTable.vue';

export default {
    created() {
        this.apartmentsList.length > 0 ? this.dataIsLoaded = true : null;
    },
    data: () => ({
        dataIsLoaded: false
    }),
    watch: {
        apartmentsList(newVal, oldVal) {
            newVal.length > 0 ? this.dataIsLoaded = true : null;
        }
    },
    computed: {
        activeReservationsList() {
            return this.$store.getters.activeReservationsList;
        },
        apartmentsList() {
            return this.$store.getters.apartmentsList;
        }
    },
    components: {
        ReservationsTable
    }
}
</script>

<style lang="scss">

</style>
