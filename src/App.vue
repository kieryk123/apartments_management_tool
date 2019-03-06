<template>
    <div class="app">
        <Header></Header>
        <div class="app__view-wrapper">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
    created() {
        this.$store.dispatch('getApartments');
    },
    components: {
        Header
    }
}
</script>

<style lang="scss">

</style>
