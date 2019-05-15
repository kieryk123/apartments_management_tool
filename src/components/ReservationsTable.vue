<template>
    <table class="table">
        <thead class="table__head">
            <tr class="table__row">
                <th class="table__head-cell table__head-cell--darker" @click="sort('apartment', 'name')">Apartment</th>
                <th class="table__head-cell" @click="sort('startDate')">Start date</th>
                <th class="table__head-cell" @click="sort('endDate')">End date</th>
                <th class="table__head-cell" @click="sort('profit')">Profit</th>
                <th class="table__head-cell" @click="sort('customer', 'firstName')">Customer</th>
                <th class="table__head-cell"></th>
            </tr>
        </thead>
        <tbody class="table__body">
            <tr v-for="(reservation, index) in activeReservationsList" :key="index" class="table__row">
                <th class="table__body-cell table__body-cell--name">
                    <img class="table__img" width="56px" height="56px" :src="reservation.apartment.imageUrl" alt="">
                    <span class="table__info-wrapper">
                        <span class="table__main-text">{{ reservation.apartment.name }}</span>
                        <span class="table__additional-text">{{ reservation.apartment.address }}</span>
                    </span>
                </th>
                <th class="table__body-cell">{{ reservation.startDate | formatDate }}</th>
                <th class="table__body-cell">{{ reservation.endDate | formatDate }}</th>
                <th class="table__body-cell">
                £{{ reservation.profit | formatMoney }}
                </th>
                <th class="table__body-cell">
                    <span class="table__info-wrapper">
                        <span class="table__main-text">{{ reservation.customer.firstName }} {{ reservation.customer.lastName }}</span>
                        <a :href="'tel:' + reservation.customer.phone" class="table__additional-text">{{ reservation.customer.phone }}</a>
                    </span>
                </th>
                <th class="table__body-cell">
                    <Dropdown
                        :menuItems="[
                            {
                                title: 'Edit reservation',
                                action: () => goToRoute('edit-reservation', reservation.id),
                                strong: false
                            },
                            {
                                title: 'Delete reservation',
                                action: () => handleDeleteReservation(reservation.id),
                                strong: true
                            }
                        ]"
                    />
                </th>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';

export default {
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        order: -1,
        sortBy: 'startDate'
    }),
    computed: {
        activeReservationsList() {
            const compare = (a, b) => {
                if (this.sortBy === 'name') {
                    a = a['apartment'][this.sortBy];
                    b = b['apartment'][this.sortBy];
                } else if(this.sortBy === 'firstName') {
                    a = a['customer'][this.sortBy];
                    b = b['customer'][this.sortBy];
                } else {
                    a = a[this.sortBy];
                    b = b[this.sortBy];
                }

                if (a.toString().toLowerCase() < b.toString().toLowerCase())
                    return this.order;
                if (a.toString().toLowerCase() > b.toString().toLowerCase())
                    return -this.order;
                return 0;
            }
            // .slice() makes copy of array instead mutating original array
            const calculatedReservations = this.data.map((el, index) => {
                return {
                    id: el.id,
                    apartment: {
                        name: this.apartment(el.apartmentId).name,
                        address: this.apartment(el.apartmentId).address,
                        imageUrl: this.apartment(el.apartmentId).imageUrl
                    },
                    startDate: el.startDate,
                    endDate: el.endDate,
                    profit: this.calculateProfit(
                                el.startDate,
                                el.endDate,
                                this.apartment(el.apartmentId).pricePerNight
                            ),
                    customer: el.customer
                }
            });

            return calculatedReservations.slice(0).sort(compare);
            // return calculatedReservations;
        },
        apartmentsList() {
            return this.$store.getters.apartmentsList;
        }
    },
    methods: {
        handleDeleteReservation(id) {
            this.$store.dispatch('deleteReservation', id);
        },
        goToRoute(route, reservationId) {
            this.$router.push({ name: route, params: {reservationId: reservationId} });
        },
        sort(field1, field2) {
            if (this.order == -1) {
                this.order = 1;
            } else {
                this.order = -1;
            }


            this.sortBy = field2 ? field2 : field1;
        },
        calculateProfit(startDate, endDate, pricePerNight) {
            startDate = new Date(startDate);
            endDate = new Date(endDate);

            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            const profit = dayDiff * pricePerNight;

            return profit;
        },
        apartment(apartmentId) {
            return this.apartmentsList.find(apartment => apartment.id === apartmentId);
        }
    },
    components: {
        Dropdown
    }
}
</script>
