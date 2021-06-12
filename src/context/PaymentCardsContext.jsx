import React from 'react';

export const paymentCardContext = React.createContext({
    getPaymentCardList: () => [],
    setPaymentCardList: (newArr) => {},
});

export const PaymentCardProvider = ({children}) => {
    const [paymentCardList, setPaymentCardList] = React.useState([]);

    const getPaymentCardList = () => paymentCardList;

    const setPaymentCardList1 = (newArr) => setPaymentCardList(newArr);

    return (
        <paymentCardContext.Provider value={{getPaymentCardList, setPaymentCardList1}}>
            {children}
        </paymentCardContext.Provider>
    );
}