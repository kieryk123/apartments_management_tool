<template>
    <div v-if="dataIsLoaded" class="page">
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
    <div v-else>Loading...</div>
</template>

<script>
    import TotalProfit from '@/components/widgets/TotalProfit.vue';
    import ProfitsComparison from '@/components/widgets/ProfitsComparison.vue';

    export default {
        created() {
            this.totalProfit > 0 ? this.dataIsLoaded = true : null;
        },
        data: () => ({
            dataIsLoaded: false
        }),
        watch: {
            totalProfit() {
                this.totalProfit > 0 ? this.dataIsLoaded = true : null;
            }
        },
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
