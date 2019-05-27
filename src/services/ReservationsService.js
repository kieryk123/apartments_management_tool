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
    getReservations() {
        return apiClient.get('/reservations.json');
    },
    addReservation(reservation) {
        return apiClient.post('/reservations.json', reservation);
    },
    deleteReservation(id) {
        return apiClient.delete(`/reservations/${id}.json/`);
    },
    editReservation(id, reservation) {
        return apiClient.put(`/reservations/${id}.json/`, reservation);
    }
}
