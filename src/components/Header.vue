<template>
    <header class="header">
        <div class="header__logo" @click="$router.push({ name: 'home' })">ApartManago</div>
        <nav :class="['header__nav', menuOpenClass]">
            <ul class="header__list">
                <li class="header__list-item">
                    <router-link
                        class="header__list-link"
                        to="/"
                        exact
                        active-class="header__list-link--active"
                        @click.native="isOpen = false"
                    >Home</router-link>
                </li>
                <li class="header__list-item">
                    <router-link
                        class="header__list-link"
                        to="/apartments"
                        active-class="header__list-link--active"
                        @click.native="isOpen = false"
                    >Apartments</router-link>
                </li>
                <li class="header__list-item">
                    <router-link
                        class="header__list-link"
                        to="/reservations"
                        active-class="header__list-link--active"
                        @click.native="isOpen = false"
                    >Reservations</router-link>
                </li>
            </ul>
        </nav>
        <button @click="toggleMenu" class="header__hamburger"></button>
    </header>
</template>

<script>
export default {
    data: () => ({
        isOpen: false
    }),
    methods: {
        toggleMenu() {
            this.isOpen = !this.isOpen;
        }
    },
    computed: {
        menuOpenClass() {
            return this.isOpen ? 'header__nav--open' : '';
        }
    }
}
</script>

<style lang="scss">

</style>
