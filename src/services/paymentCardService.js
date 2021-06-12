import axios from 'axios';

const paymentCardApi = axios.create({
    baseURL: 'http://localhost:8000',
});

export default paymentCardApi;