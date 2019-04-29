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
                <input
                    id="image"
                    @change="handleImageUpload"
                    class="input"
                    type="file"
                    placeholder="Photo">
                <img :src="imageUrl" alt="" width="100%" height="auto">
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
export default {
    data: () => ({
        name: '',
        address: '',
        pricePerNight: null,
        imageUrl: '',
        image: null
    }),
    methods: {
        handleImageUpload(e) {
            const file = e.target.files[0];
            const name = file.name;

            if (name.lastIndexOf('.') <= 0) {
                alert('Please add a valid file!');
            }

            const fileReader = new FileReader();

            fileReader.addEventListener('load', (e) => {
                this.imageUrl = fileReader.result;
            });
            fileReader.readAsDataURL(file);

            this.image = file;
        },
        submitForm() {
            if (
                this.name == '' ||
                this.address == '' ||
                this.pricePerNight == null ||
                this.image == null
            ) {
                alert('All fields are required!');
                return;
            }

            const apartment = {
                name: this.name,
                address: this.address,
                pricePerNight: this.pricePerNight,
                image: this.image
            }

            this.$store.dispatch('addApartment', apartment);
            this.$router.push({ name: 'apartments' });
        }
    }
}
</script>
