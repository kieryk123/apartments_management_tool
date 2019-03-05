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
                    :value="apartmentsList[apartmentId]"
                    :options="apartmentsList"
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
    created() {
        this.reservationId = this.$route.params.reservationId;
        this.firstName = this.reservationsList[this.reservationId].customer.firstName;
        this.lastName = this.reservationsList[this.reservationId].customer.lastName;
        this.startDate = this.reservationsList[this.reservationId].startDate;
        this.endDate = this.reservationsList[this.reservationId].endDate;
        this.contactNumber = this.reservationsList[this.reservationId].customer.phone;
        this.apartmentId = this.reservationsList[this.reservationId].apartmentId;
    },
    data: () => ({
        reservationId: null,
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: '',
        contactNumber: '',
        apartmentId: 0
    }),
    computed: {
        reservationsList() {
            return this.$store.getters.reservationsList;
        },
        apartmentsList() {
            const selectOptions = this.$store.getters.apartmentsList.map((el, index) => {
                return {
                    label: el.name,
                    value: index
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
            this.apartmentId = option.value;
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
