<template>
    <div class="widget total-profit">
        <img
            width="80"
            height="auto"
            :src="require('@/images/icon-money-bag.svg')"
            alt="">
        <p class="total-profit__title">{{ title }}</p>
        <p class="total-profit__value">£{{ value | formatMoney }}</p>
    </div>
</template>

<script>
export default {
    props: ['title', 'value']
}
</script>

<style lang="scss">
</style>
