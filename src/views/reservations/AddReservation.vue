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
                    :disabledDates="disabledDates"
                    :key="disabledDates.length"
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
                    :value="selectOptions[0]"
                    :options="selectOptions"
                    :onChange="handleChooseApartment">
                </v-select>
            </div>
        </div>
        <div class="buttons-wrapper">
            <button class="btn btn--primary" @click="submitForm">Submit</button>
            <button
                class="btn btn--secondary"
                @click="$router.push({ name: 'reservations' })"
            >Cancel</button>
        </div>
    </div>
</template>

<script>
import HotelDatePicker from 'vue-hotel-datepicker';
import vSelect from 'vue-select';
import { getDatesBetween } from '@/utils/utils';

export default {
    created() {
        this.setDisabledDates();
    },
    data: () => ({
        firstName: '',
        lastName: '',
        startDate: '',
        endDate: '',
        contactNumber: '',
        apartmentId: '',
        disabledDates: []
    }),
    computed: {
        activeReservationsList() {
            return this.$store.getters.activeReservationsList;
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
            // jesli data jest w disabledDates to wyzerować ją
            this.startDate = date;
        },
        setEndDate(date) {
            // jesli data jest w disabledDates to wyzerować ją
            this.endDate = date;
        },
        handleChooseApartment(option) {
            this.apartmentId = option.value;
            this.setDisabledDates();
            this.checkIfDatesAreBooked();
        },
        checkIfDatesAreBooked() {
            if (
                this.disabledDates.includes(this.startDate) || this.disabledDates.includes(this.endDate)
            ) {
                this.setStartDate('');
                this.setEndDate('');
            }
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
        },
        setDisabledDates() {
            const { apartmentId, activeReservationsList } = this;
            const reservations = activeReservationsList.filter((el) => el.apartmentId == apartmentId);

            let disabledDates = reservations.map((reservation) => {
                return getDatesBetween(reservation.startDate, reservation.endDate);
            });
            disabledDates = [ ...new Set(disabledDates.flat()) ];

            if (disabledDates.length != 0) {
                this.disabledDates = disabledDates;
            } else {
                this.disabledDates = [];
            }
        }
    },
    components: {
        HotelDatePicker,
        vSelect
    }
}
</script>
