<template>
    <div class="widget upcoming-reservation">
        <p class="upcoming-reservation__title">Upcoming reservation</p>
        <img
            width="80"
            height="auto"
            :src="require('@/images/icon-customer.svg')"
            alt="">
        <p class="upcoming-reservation__customer"><strong>{{ name }}</strong> (tel. <a :href="'tel:' + phone">{{ phone }}</a>)</p>
        <p class="upcoming-reservation__apartment">{{ apartmentName }}</p>
        <p class="upcoming-reservation__period">{{ startDate | formatDate }} - {{ endDate | formatDate }}</p>
    </div>
</template>

<script>
export default {
    props: ['reservationData'],
    computed: {
        name() {
            return `${this.reservationData.customer.firstName} ${this.reservationData.customer.lastName}`;
        },
        phone() {
            return this.reservationData.customer.phone;
        },
        apartmentName() {
            return this.reservationData.apartmentName;
        },
        startDate() {
            return this.reservationData.startDate;
        },
        endDate() {
            return this.reservationData.endDate;
        }
    }
}
</script>
