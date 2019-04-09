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
                    format="DD/MM/YYYY"
                    :startingDateValue="new Date(startDate)"
                    :endingDateValue="new Date(endDate)"
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
                    :value="currentSelectValue"
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
        const obj = { ...this.activeReservationsList.filter(el => el.id == this.$route.params.reservationId) };

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
        currentSelectValue: '',
        disabledDates: []
    }),
    computed: {
        activeReservationsList() {
            return this.$store.getters.activeReservationsList;
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
            this.setDisabledDates();
            if (option.value != undefined) {
                this.apartmentId = option.value;
                this.setDisabledDates();
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
        },
        setDisabledDates() {
            const { apartmentId, activeReservationsList, reservationId } = this;
            const reservations = activeReservationsList.filter((el) => el.apartmentId == apartmentId);

            let disabledDates = reservations
                .filter((reservation) => reservation.id != reservationId)
                .map((reservation) => {
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
