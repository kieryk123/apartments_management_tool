<template>
    <header class="header">
        <div class="header__logo">ApartManago</div>
        <nav class="header__nav">
            <ul class="header__list">
                <li class="header__list-item">
                    <router-link
                        class="header__list-link"
                        to="/"
                        exact
                        active-class="header__list-link--active"
                    >Home</router-link>
                </li>
                <li class="header__list-item">
                    <router-link
                        class="header__list-link"
                        to="/apartments"
                        active-class="header__list-link--active"
                    >Apartments</router-link>
                </li>
                <li class="header__list-item">
                    <router-link
                        class="header__list-link"
                        to="/reservations"
                        active-class="header__list-link--active"
                    >Reservations</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {

}
</script>

<style lang="scss">

</style>
