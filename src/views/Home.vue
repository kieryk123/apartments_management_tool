<template>
    <div class="page">
        <div class="widgets-wrapper">
            <TotalProfit
                title="Total profit"
                :value="totalProfit"
            />
            <ProfitsComparison
                :actualMonthValue="actualMonthProfit"
                :previousMonthValue="previousMonthProfit"
            />
        </div>
    </div>
</template>

<script>
    import TotalProfit from '@/components/widgets/TotalProfit.vue';
    import ProfitsComparison from '@/components/widgets/ProfitsComparison.vue';

    export default {
        computed: {
            totalProfit() {
                return this.$store.getters.totalProfit;
            },
            actualMonthProfit() {
                return this.$store.getters.actualMonthProfit;
            },
            previousMonthProfit() {
                return this.$store.getters.previousMonthProfit;
            }
        },
        components: {
            TotalProfit,
            ProfitsComparison
        }
    }
</script>
