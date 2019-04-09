<template>
    <div class="widget profits-comparison">
        <div class="profits-comparison__btns-wrapper">
            <button
                :class="['profits-comparison__btn', isPreviousTabActive]"
                @click="activeTab = 'previous'"
            >Previous month</button>
            <button
                :class="['profits-comparison__btn', isActualTabActive]"
                @click="activeTab = 'actual'"
            >Actual month</button>
        </div>
        <div class="profits-comparison__tabs-wrapper">
            <div
                v-if="activeTab == 'previous'"
                class="profits-comparison__tab"
            >
                <p class="profits-comparison__value">£{{ previousMonthValue | formatMoney }}</p>
            </div>
            <div
                v-else-if="activeTab == 'actual'"
                class="profits-comparison__tab"
            >
                <p class="profits-comparison__value">£{{ actualMonthValue | formatMoney }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['previousMonthValue', 'actualMonthValue'],
    data: () => ({
        activeTab: 'previous'
    }),
    computed: {
        isPreviousTabActive() {
            return this.activeTab == 'previous' ? 'profits-comparison__btn--active' : null;
        },
        isActualTabActive() {
            return this.activeTab == 'actual' ? 'profits-comparison__btn--active' : null;
        }
    }
}
</script>

<style lang="scss">
</style>
