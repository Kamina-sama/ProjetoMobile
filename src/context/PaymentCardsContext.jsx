import React from 'react';

export const paymentCardContext = React.createContext({
    getPaymentCardList: () => [],
    setPaymentCardList: (newArr) => {},
});

export const PaymentCardProvider = ({children}) => {
    const [paymentCardList, setPaymentCardList] = React.useState([]);

    const getPaymentCardList = () => paymentCardList;

    const setPaymentCardList = (newArr) => setPaymentCardList(newArr);

    return (
        <paymentCardContext.Provider value={{getPaymentCardList, setPaymentCardList}}>
            {children}
        </paymentCardContext.Provider>
    );
}