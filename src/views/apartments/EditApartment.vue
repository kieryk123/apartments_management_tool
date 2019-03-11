<template>
    <div class="page">
        <div class="page__heading">
            <h1 class="page__heading-title">Add new apartment</h1>
        </div>
        <div class="form">
            <div class="form__col">
                <label class="label" for="name">Apartment name:</label>
                <input id="name" v-model="name" class="input" type="text" placeholder="Name">
            </div>
            <div class="form__col">
                <label class="label" for="address">Apartment address:</label>
                <input id="address" v-model="address" class="input" type="text" placeholder="Address">
            </div>
            <div class="form__col">
                <label class="label" for="price">Apartment price per night:</label>
                <input id="price" v-model.number="pricePerNight" class="input" type="number" placeholder="Price per night">
            </div>
            <div class="form__col">
                <label class="label" for="image">Apartment image:</label>
                <input id="image" @change="handleImageUpload" class="input" type="file" placeholder="Photo">
            </div>
        </div>
        <button class="btn btn--primary" @click="submitForm">Submit</button>
    </div>
</template>

<script>
export default {
    beforeRouteEnter (to, from, next) {
        to.params.apartmentId ? next() : next({ name: 'reservations' });
    },
    created() {
        const obj = { ...this.apartmentsList.filter(el => el.id == this.$route.params.apartmentId) };

        this.apartmentId = this.$route.params.apartmentId;
        this.name = obj[0].name;
        this.address = obj[0].address;
        this.pricePerNight = obj[0].pricePerNight;
        this.imageObject = obj[0].imageObject;
    },
    data: () => ({
        apartmentId: null,
        name: '',
        address: '',
        pricePerNight: null,
        imageObject: null
    }),
    computed: {
        apartmentsList() {
            return this.$store.getters.apartmentsList;
        }
    },
    methods: {
        handleImageUpload(e) {
            this.imageObject = window.URL.createObjectURL(e.target.files[0]);
        },
        submitForm() {
            const apartment = {
                id: this.apartmentId,
                name: this.name,
                address: this.address,
                pricePerNight: this.pricePerNight,
                imageObject: this.imageObject
            }

            this.$store.dispatch('editApartment', apartment);
            this.$router.push({ name: 'apartments' });
        }
    }
}
</script>
