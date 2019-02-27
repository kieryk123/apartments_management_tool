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
                <label class="label" for="startDate">Start date:</label>
                <input id="startDate" v-model="startDate" class="input" type="text">
            </div>
            <div class="form__col">
                <label class="label" for="endDate">End date:</label>
                <input id="endDate" v-model="endDate" class="input" type="text">
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
            return this.$store.getters.apartmentsList;
        }
    },
    methods: {
        handleChooseApartment(e) {
            this.apartmentId = e.target.value;
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
    }
}
</script>
