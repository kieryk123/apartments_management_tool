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
    components: {
        Header
    }
}
</script>

<style lang="scss">
@import "@/styles/main.scss";
</style>
