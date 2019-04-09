<template>
    <div class="widget profits-comparison">
        <div class="profits-comparison__btns-wrapper">
            <button
                :class="['profits-comparison__btn', isPreviousTabActive]"
                @click="activeTab = 'previous'"
            >{{ new Date().getMonth() - 1 | getMonth }}</button>
            <button
                :class="['profits-comparison__btn', isActualTabActive]"
                @click="activeTab = 'actual'"
            >{{ new Date().getMonth() | getMonth }}</button>
        </div>
        <div class="profits-comparison__tabs-wrapper">
            <div class="profits-comparison__content">
                <img
                    width="80"
                    height="auto"
                    :src="require('@/images/icon-comparison.svg')"
                    alt="">
                <p class="profits-comparison__title">Profit for {{ month | getMonth }} <span v-if="activeTab == 'actual'">({{ percentage }})</span></p>
                <p class="profits-comparison__value">£{{ value | formatMoney }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['previousMonthValue', 'actualMonthValue'],
    data: () => ({
        activeTab: 'actual'
    }),
    computed: {
        isPreviousTabActive() {
            return this.activeTab == 'previous' ? 'profits-comparison__btn--active' : null;
        },
        isActualTabActive() {
            return this.activeTab == 'actual' ? 'profits-comparison__btn--active' : null;
        },
        value() {
            return this.activeTab == 'previous' ? this.previousMonthValue : this.actualMonthValue;
        },
        month() {
            return this.activeTab == 'previous' ? new Date().getMonth() - 1 : new Date().getMonth();
        },
        percentage() {
            if (this.previousMonthValue > this.actualMonthValue) {
                const percentage = ((this.previousMonthValue - this.actualMonthValue) / this.previousMonthValue * 100).toFixed(1);
                return `${percentage}% less`
            } else {
                const percentage = ((this.previousMonthValue - this.actualMonthValue) / this.previousMonthValue * 100).toFixed(1) * (-1);
                return `${percentage}% more`
            }
        }
    }
}
</script>
