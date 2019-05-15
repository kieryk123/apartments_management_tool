<template>
    <div v-if="dataIsLoaded" class="page">
        <div class="page__heading">
            <h1 class="page__heading-title">Apartments list ({{ apartmentsList.length }})</h1>
            <router-link
                class="btn btn--primary"
                to="/apartments/add"
            >+ Add new apartment</router-link>
        </div>
        <div class="table-wrapper">
            <ApartmentsTable :data="apartmentsList"/>
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<script>
import ApartmentsTable from '@/components/ApartmentsTable.vue';

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
        apartmentsList() {
            return this.$store.getters.apartmentsList;
        }
    },
    components: {
        ApartmentsTable
    }
}
</script>

<style lang="scss">

</style>
