import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { PaymentCard } from '../../components/PaymentCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton';
import { getCardListStore, setCardListStore } from './helper';

export default function PaymentCards({route, navigation}) {
    const [cardList, setCardList] = useState([]);

    useEffect(() => {
        getCardListStore(setCardList);
    }, [route.params]);
    
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cartões de Pagamento</Text>
            {cardList.map(item => (
                <View style={styles.paymentCardView} key={item.id}>
                    <PaymentCard
                        {...item}
                        navigation={navigation}
                    />
                    <Text
                        style={styles.deleteDiv}
                        onPress={() => {
                            const newArr = cardList.filter(newItem => item.id !== newItem.id);
                            setCardListStore(newArr);
                            getCardListStore(setCardList);
                        }}
                    >Apagar</Text>
                </View>
            ))}
            <PrimaryButton
                onPress={() => navigation.navigate('DetailedCard', {
                    creditNameProp: "",
                    creditNumberProp: "",
                    validateProp: ""
                })}
            >CADASTRAR NOVO CARTÃO</PrimaryButton>
            <SecondaryButton>VOLTAR</SecondaryButton>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 32
    },
    title: {
        fontSize: 34,
        marginBottom: 16,
        paddingLeft: 20
    },
    h2: {
        fontSize: 18,
        marginTop: 16,
    },
    mainContent: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    paymentCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    deleteDiv: {
        backgroundColor: "red",
        height: 80,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center'
    }
});