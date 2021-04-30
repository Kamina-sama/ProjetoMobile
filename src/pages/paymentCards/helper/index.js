import AsyncStorage from '@react-native-async-storage/async-storage';

export const paymentCards = [
    {
        id: 1,
        creditName: "João",
        creditNumber: "0312032",
        creditValidate: "20/05"
    },
    {
        id: 2,
        creditName: "Paulo",
        creditNumber: "5464",
        creditValidate: "20/05"
    },
    {
        id: 3,
        creditName: "Roberto",
        creditNumber: "652342",
        creditValidate: "20/05"
    }
];

export async function setCardListStore(arr) {
    await AsyncStorage.setItem("paymentCardsList", JSON.stringify(arr), (error) => {
        if (error) {
            throw new Error(error);
        }
    });
}

export function getCardListStore(setState) {
    AsyncStorage.getItem("paymentCardsList").then((result, error) => {
        if (error) {
            throw new Error(error);
        }
        const response = JSON.parse(result);
        setState(response);
    });
}