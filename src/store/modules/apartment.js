import firebase from 'firebase';
import ApartmentsService from '@/services/ApartmentsService.js';

export const namespaced = true;

export const state = {
    apartmentsList: []
};

export const mutations = {
    'GET_APARTMENTS'(state, payload) {
        state.apartmentsList = payload;
    },
    'ADD_APARTMENT'(state, payload) {
        state.apartmentsList.push(payload);
    },
    'DELETE_APARTMENT'(state, payload) {
        const filteredApartmentsList = state.apartmentsList.filter((el) => el.id !== payload);

        state.apartmentsList = filteredApartmentsList;
    },
    'EDIT_APARTMENT'(state, payload) {
        for (let i = 0; i < state.apartmentsList.length; i++) {
            if (state.apartmentsList[i].id == payload.id) {
                state.apartmentsList[i].name = payload.name;
                state.apartmentsList[i].address = payload.address;
                state.apartmentsList[i].pricePerNight = payload.pricePerNight;
                state.apartmentsList[i].imageUrl = payload.imageUrl;
            }
        }
    }
};

export const actions = {
    getApartments({commit}) {
        ApartmentsService.getApartments()
            .then(res => {
                const data = res.data;
                let apartments = [];

                for (let key in data) {
                    const apartment = data[key];
                    apartment.id = key;
                    apartments.push(apartment)
                }

                return apartments;
            })
            .then(res => commit('GET_APARTMENTS', res))
            .catch(err => console.log(err));
    },
    addApartment({commit}, payload) {
        const apartment = {
            name: payload.name,
            address: payload.address,
            pricePerNight: payload.pricePerNight
        };
        let id;

        ApartmentsService.addApartment(apartment)
            .then(res => {
                id = res.data.name;
                return id;
            })
            .then(id => {
                const filename = payload.image.name;
                const ext = filename.slice(filename.lastIndexOf('.') + 1);
                return firebase.storage().ref(`apartments/${id}.${ext}`).put(payload.image);
            })
            .then(file => {
                let imageUrl = file.ref.getDownloadURL()
                    .then(url => {
                        firebase.database().ref('apartments').child(id).update({imageUrl: url});
                        return url;
                    });

                return imageUrl;
            })
            .then(imageUrl => {
                const finalApartment = {
                    ...apartment,
                    id,
                    imageUrl
                };
                commit('ADD_APARTMENT', finalApartment);
            })
            .catch(err => console.log(err));
    },
    deleteApartment({commit}, id) {
        ApartmentsService.deleteApartment(id)
            .then(res => {
                commit('DELETE_APARTMENT', id);
            })
            .catch(err => console.log(err));
    },
    editApartment({commit}, data) {
        const apartment = {
            id: data.id,
            name: data.name,
            address: data.address,
            pricePerNight: data.pricePerNight
        };

        if (!data.image) {
            const imageUrl = data.imageUrl;
            const finalData = {
                ...apartment,
                imageUrl
            };
            commit('EDIT_APARTMENT', finalData);
        } else {
            ApartmentsService.editApartment(data.id, apartment)
                .then(() => {
                    const filename = data.image.name;
                    const ext = filename.slice(filename.lastIndexOf('.') + 1);
                    return firebase.storage().ref(`apartments/${data.id}.${ext}`).put(data.image);
                })
                .then(file => {
                    let imageUrl = file.ref.getDownloadURL()
                        .then(url => {
                            firebase.database().ref('apartments').child(data.id).update({imageUrl: url});
                            return url;
                        });

                    return imageUrl;
                })
                .then(imageUrl => {
                    const finalData = {
                        ...apartment,
                        imageUrl
                    };
                    commit('EDIT_APARTMENT', finalData);
                })
                .catch(err => console.log(err));
        }
    }
};

export const getters = {
    apartmentsList(state) {
        return state.apartmentsList;
    }
};
