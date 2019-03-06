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
                <input id="price" v-model="pricePerNight" class="input" type="number" placeholder="Price per night">
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
import axios from 'axios';

export default {
    data: () => ({
        name: '',
        address: '',
        pricePerNight: null,
        imageObject: ''
    }),
    methods: {
        handleImageUpload(e) {
            this.imageObject = window.URL.createObjectURL(e.target.files[0]);
        },
        submitForm() {
            if (this.name == '' || this.address == '' || this.pricePerNight == null || this.imageObject == '') {
                alert('All fields are required!');
                return;
            }

            const apartment = {
                name: this.name,
                address: this.address,
                pricePerNight: this.pricePerNight,
                imageObject: this.imageObject
            }

            this.$store.dispatch('addApartment', apartment);
            this.$router.push({ name: 'apartments' });
        }
    }
}
</script>
