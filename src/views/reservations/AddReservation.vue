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
                <label class="label">Period of time:</label>
                <HotelDatePicker
                    format="DD/MM/YYYY"
                    @check-in-changed="setStartDate"
                    @check-out-changed="setEndDate">
                </HotelDatePicker>
            </div>
            <div class="form__col">
                <label class="label" for="contactNumber">Contact number:</label>
                <input id="contactNumber" v-model="contactNumber" class="input" type="text">
            </div>
            <div class="form__col">
                <label class="label" for="apartment">Choose apartment:</label>
                <select @change="handleChooseApartment">
                    <option id="apartment" v-for="(apartment, index) in apartmentsList" :value="index">
                        {{ apartment.name }}
                    </option>
                </select>
            </div>
        </div>
        <button class="btn btn--primary" @click="submitForm">Submit</button>
    </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker';

export default {
    data: () => ({
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: '',
        contactNumber: '',
        apartmentId: 0
    }),
    computed: {
        apartmentsList() {
            return this.$store.getters.apartmentsList;
        }
    },
    methods: {
        setStartDate(date) {
            this.startDate = date;
        },
        setEndDate(date) {
            this.endDate = date;
        },
        handleChooseApartment(e) {
            this.apartmentId = e.target.value;
        },
        submitForm() {
            if (this.firstName == '' || this.lastName == '' || this.startDate == '' || this.endDate == '' || this.contactNumber == '') {
                alert('All fields are required!');
                return;
            }

            const reservation = {
                apartmentId: this.apartmentId,
                startDate: this.startDate,
                endDate: this.endDate,
                customer: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phone: this.contactNumber
                }
            }

            this.$store.dispatch('addReservation', reservation);
            this.$router.push({ name: 'reservations' });
        }
    },
    components: {
        HotelDatePicker
    }
}
</script>