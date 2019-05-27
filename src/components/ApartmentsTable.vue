<template>
    <table class="table">
        <thead class="table__head">
            <tr class="table__row">
                <th
                    class="table__head-cell table__head-cell--darker"
                    @click="sort('name')"
                >Apartment name</th>
                <th
                    class="table__head-cell"
                    @click="sort('address')"
                >Address</th>
                <th
                    class="table__head-cell"
                    @click="sort('pricePerNight')"
                >Price per night</th>
                <th class="table__head-cell"></th>
            </tr>
        </thead>
        <tbody class="table__body">
            <tr v-for="apartment in apartmentsList" :key="apartment.id" class="table__row">
                <th class="table__body-cell table__body-cell--name">
                    <img class="table__img" width="56px" height="56px" :src="apartment.imageUrl" alt="">
                    <span class="table__info-wrapper">
                        <span class="table__main-text">{{ apartment.name }}</span>
                    </span>
                </th>
                <th class="table__body-cell">{{ apartment.address }}</th>
                <th class="table__body-cell">£{{ apartment.pricePerNight | formatMoney }}</th>
                <th class="table__body-cell">
                    <Dropdown
                        :menuItems="[
                            {
                                title: 'Edit apartment',
                                action: () => goToRoute('edit-apartment', apartment.id),
                                strong: false
                            },
                            {
                                title: 'Delete apartment',
                                action: () => handleDeleteApartment(apartment.id),
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
        sortBy: 'name'
    }),
    computed: {
        apartmentsList() {
            const compare = (a, b) => {
                let itemA;
                let itemB;

                if (
                    typeof a[this.sortBy] === 'number' &&
                    typeof b[this.sortBy] === 'number'
                ) {
                    itemA = a[this.sortBy];
                    itemB = b[this.sortBy];
                } else {
                    itemA = a[this.sortBy].toString().toLowerCase();
                    itemB = b[this.sortBy].toString().toLowerCase();
                }

                if (itemA < itemB)
                    return this.order;
                if (itemA > itemB)
                    return -this.order;
                return 0;
            }
            // .slice() makes copy of array instead mutating original array
            return this.data.slice(0).sort(compare);
        },
        activeReservationsList() {
            return this.$store.getters['reservation/activeReservationsList'];
        }
    },
    methods: {
        handleDeleteApartment(id) {
            const isBooked = this.activeReservationsList.some(el => el.apartmentId == id);

            isBooked ?
                alert('This apartment is in use. You cannot delete booked apartment.') :
                this.$store.dispatch('deleteApartment', id);
        },
        goToRoute(route, apartmentId) {
            this.$router.push({ name: route, params: {apartmentId: apartmentId} });
        },
        sort(field) {
            if (this.order == -1) {
                this.order = 1;
            } else {
                this.order = -1;
            }

            this.sortBy = field;
        }
    },
    components: {
        Dropdown
    }
}
</script>
