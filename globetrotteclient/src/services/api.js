import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/api`;

const destinationApi = {
    getAllDestinations: () => {
        return axios.get(`${API_BASE_URL}/destinations`);
    },

    getDestination: (id) => {
        return axios.get(`${API_BASE_URL}/destinations/${id}`);
    },

    createDestination: (destinationData) => {
        return axios.post(`${API_BASE_URL}/destinations`, destinationData);
    },

    updateDestination: (id, destinationData) => {
        return axios.patch(`${API_BASE_URL}/destinations/${id}`, destinationData);
    },

    deleteDestination: (id) => {
        return axios.delete(`${API_BASE_URL}/destinations/${id}`);
    },

    getRandomDestination: () => {
        return axios.get(`${API_BASE_URL}/destinations/random`);
    },

    verifyAnswer: (id, data) => {
        return axios.post(`${API_BASE_URL}/destinations/verify/${id}`, data);
    }
};

export default destinationApi; 