import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://apartment-management-tool.firebaseio.com',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getApartments() {
        return apiClient.get('/apartments.json');
    },
    addApartment(apartment) {
        return apiClient.post('/apartments.json', apartment);
    },
    deleteApartment(id) {
        return apiClient.delete(`/apartments/${id}.json/`);
    },
    editApartment(id, apartment) {
        return apiClient.put(`/apartments/${id}.json/`, apartment);
    }
}
