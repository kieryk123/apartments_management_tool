<template>
    <div class="page">
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
                <tr v-for="(apartment, index) in apartmentsList" :key="index" class="table__row">
                    <th class="table__body-cell table__body-cell--name">
                        <img class="table__img" src="http://placehold.it/56x56" alt="">
                        <span class="table__info-wrapper">
                            <span class="table__main-text">{{ apartment.name }}</span>
                        </span>
                    </th>
                    <th class="table__body-cell">{{ apartment.address }}</th>
                    <th class="table__body-cell">£{{ apartment.pricePerNight }}</th>
                    <th class="table__body-cell">
                        <Dropdown
                            :menuItems="[
                                {
                                    title: 'Edit apartment',
                                    action: () => goToRoute('edit-apartment', index),
                                    strong: false
                                },
                                {
                                    title: 'Delete apartment',
                                    action: () => handleDeleteApartment(index),
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
        handleDeleteApartment(id) {
            this.$store.dispatch('deleteApartment', id);
        },
        goToRoute(route, apartmentId) {
            this.$router.push({ name: route, params: {apartmentId: apartmentId} });
        }
    },
    computed: {
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
