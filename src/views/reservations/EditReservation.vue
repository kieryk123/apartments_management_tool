<template>
    <div class="page">
        <div class="page__heading">
            <h1 class="page__heading-title">Add new reservation</h1>
        </div>
        <div class="form">
            <div class="form__col">
                <label class="label" for="firstName">Customer first name:</label>
                <input id="firstName" v-model="firstName" class="input" type="text">
            </div>
            <div class="form__col">
                <label class="label" for="lastName">Customer last name:</label>
                <input id="lastName" v-model="lastName" class="input" type="text">
            </div>
            <div class="form__col">
                <label class="label" for="startDate">Period of time:</label>
                <HotelDatePicker
                    :startingDateValue="new Date(startDate)"
                    :endingDateValue="new Date(endDate)"
                    @check-in-changed="setStartDate"
                    @check-out-changed="setEndDate">
                </HotelDatePicker>
            </div>
            <div class="form__col">
                <label class="label" for="contactNumber">Contact number:</label>
                <input id="contactNumber" v-model="contactNumber" class="input" type="text">
            </div>
            <div class="form__col">
                <label class="label">Choose apartment:</label>
                <v-select
                    :value="currentSelectValue"
                    :options="selectOptions"
                    :onChange="handleChooseApartment">
                </v-select>
            </div>
        </div>
        <button class="btn btn--primary" @click="submitForm">Submit</button>
    </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker';
import vSelect from 'vue-select';

export default {
    beforeRouteEnter (to, from, next) {
        to.params.reservationId ? next() : next({ name: 'reservations' });
    },
    created() {
        const obj = { ...this.reservationsList.filter(el => el.id == this.$route.params.reservationId) };

        this.reservationId = this.$route.params.reservationId;
        this.firstName = obj[0].customer.firstName;
        this.lastName = obj[0].customer.lastName;
        this.startDate = obj[0].startDate;
        this.endDate = obj[0].endDate;
        this.contactNumber = obj[0].customer.phone;
        this.apartmentId = obj[0].apartmentId;

        this.setCurrentSelectValue(obj[0].apartmentId);
    },
    data: () => ({
        reservationId: null,
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: '',
        contactNumber: '',
        apartmentId: '',
        currentSelectValue: ''
    }),
    computed: {
        reservationsList() {
            return this.$store.getters.reservationsList;
        },
        apartmentsList() {
            return this.$store.getters.apartmentsList;
        },
        selectOptions() {
            const selectOptions = this.$store.getters.apartmentsList.map(apartment => {
                return {
                    label: apartment.name,
                    value: apartment.id
                }
            });

            return selectOptions;
        }
    },
    methods: {
        setStartDate(date) {
            this.startDate = date;
        },
        setEndDate(date) {
            this.endDate = date;
        },
        handleChooseApartment(option) {
            // check if option is not undefined (vue-select fires onChange on init)
            if (option.value != undefined) {
                this.apartmentId = option.value;
            }
        },
        setCurrentSelectValue(apartmentId) {
            const selectValue = this.apartmentsList
                .filter(el => el.id == apartmentId)
                .map(el => {
                    return {
                        label: el.name,
                        value: el.id
                    }
                });

            this.currentSelectValue = selectValue;
        },
        submitForm() {
            const reservation = {
                id: this.reservationId,
                apartmentId: this.apartmentId,
                startDate: this.startDate,
                endDate: this.endDate,
                customer: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.contactNumber
                }
            }

            this.$store.dispatch('editReservation', reservation);
            this.$router.push({ name: 'reservations' });
        }
    },
    components: {
        HotelDatePicker,
        vSelect
    }
}
</script>
