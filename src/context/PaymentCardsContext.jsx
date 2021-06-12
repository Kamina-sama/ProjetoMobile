import React, { useState } from 'react';
import paymentCardApi from '../services/paymentCardService';

export const paymentCardContext = React.createContext({
    getPaymentCardList: () => [],
    getPaymentCard: (id) => [],
    deletePaymentCard: (id) => {},
    createPaymentCard: (paymentCardList) => {},
    editPaymentCard: (id) => {},
});

export const PaymentCardProvider = ({children}) => {
    const [paymentCardList, setPaymentCardList] = useState([]);

    async function getPaymentCardList() {
        await paymentCardApi.get('/payment')
            .then(response => setPaymentCardList(response.data))
            .catch(error => console.log(error))
        ;
    } 

    async function deletePaymentCard(id) {
        await dataBaseApi
            .delete(`/payment/${id}`)
            .then(() => getSchedules())
            .catch(error => console.log(error));
    }

    async function createPaymentCard(payment) {
        await dataBaseApi
            .post('/payment', payment)
            .then(() => getSchedules())
            .catch(error => console.log(error));
    }

    async function editPaymentCard(paymentCard) {
        await dataBaseApi
            .put(`/payment/${paymentCard.id}`, paymentCard)
            .then(() => getSchedules())
            .catch(error => console.log(error));
    }

    async function getPaymentCard(id) {
        await dataBaseApi
            .get(`/payment/${id}`)
            .then(response => response)
            .catch(error => console.log(error));
    }

    return (
        <paymentCardContext.Provider value={{
            getPaymentCardList,
            deletePaymentCard,
            createPaymentCard,
            editPaymentCard,
            getPaymentCard,
        }}>
            {children}
        </paymentCardContext.Provider>
    );
}