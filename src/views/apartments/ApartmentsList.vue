<template>
    <div v-if="dataIsLoaded" class="page">
        <div class="page__heading">
            <h1 class="page__heading-title">Apartments list ({{ apartmentsList.length }})</h1>
            <router-link
                class="btn btn--primary"
                to="/apartments/add"
            >+ Add new apartment</router-link>
        </div>
        <table class="table">
            <thead class="table__head">
                <tr class="table__row">
                    <th class="table__head-cell table__head-cell--darker">Apartment name</th>
                    <th class="table__head-cell">Address</th>
                    <th class="table__head-cell">Price per night</th>
                    <th class="table__head-cell"></th>
                </tr>
            </thead>
            <tbody class="table__body">
                <tr v-for="apartment in apartmentsList" :key="apartment.id" class="table__row">
                    <th class="table__body-cell table__body-cell--name">
                        <img class="table__img" width="56px" height="56px" :src="apartment.imageUrl" alt="">
                        <span class="table__info-wrapper">
                            <span class="table__main-text">{{ apartment.name }}</span>
                        </span>
                    </th>
                    <th class="table__body-cell">{{ apartment.address }}</th>
                    <th class="table__body-cell">£{{ apartment.pricePerNight | formatMoney }}</th>
                    <th class="table__body-cell">
                        <Dropdown
                            :menuItems="[
                                {
                                    title: 'Edit apartment',
                                    action: () => goToRoute('edit-apartment', apartment.id),
                                    strong: false
                                },
                                {
                                    title: 'Delete apartment',
                                    action: () => handleDeleteApartment(apartment.id),
                                    strong: true
                                }
                            ]"
                        />
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else>Loading...</div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';

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
    methods: {
        handleDeleteApartment(id) {
            const isBooked = this.activeReservationsList.some(el => el.apartmentId == id);

            isBooked ?
                alert('This apartment is in use. You cannot delete booked apartment.') :
                this.$store.dispatch('deleteApartment', id);
        },
        goToRoute(route, apartmentId) {
            this.$router.push({ name: route, params: {apartmentId: apartmentId} });
        }
    },
    computed: {
        apartmentsList() {
            return this.$store.getters.apartmentsList;
        },
        activeReservationsList() {
            return this.$store.getters.activeReservationsList;
        }
    },
    components: {
        Dropdown
    }
}
</script>

<style lang="scss">

</style>
