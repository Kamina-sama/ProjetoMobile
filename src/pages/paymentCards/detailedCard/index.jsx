import React, {useContext, useEffect, useState} from 'react';
import { Image, SafeAreaView, StyleSheet, Text } from 'react-native';
import { CustomInput } from '../../../components/Input';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { SecondaryButton } from '../../../components/SecondaryButton';
import { paymentCardContext } from '../../../context/PaymentCardsContext';

export const DetailedCard = ({route, navigation}) => {
    const {creditNameProp, creditNumberProp, validateProp, idProp} = route.params;
    const {getPaymentCardList, setPaymentCardList} = useContext(paymentCardContext);
    const [name, setName] = useState("");
    const [creditNumber, setCreditNumber] = useState("");
    const [validate, setValidate] = useState("");
    let cardList = [];
    
    useEffect(() => {
        setName(JSON.stringify(creditNameProp).replaceAll(`"`,""));
        setCreditNumber(JSON.stringify(creditNumberProp).replaceAll(`"`,""));
        setValidate(JSON.stringify(validateProp).replaceAll(`"`,""));
        cardList = getPaymentCardList();
    }, [route.params]);

    function removeNonLettersInput (value){
        return value.replace(/\D/g, "");
    };
    


    function handleSaveButtonPress() {
        cardList = getPaymentCardList();
        if (idProp === undefined) {
            const newCardBody = {
                id: Math.random(),
                name: name,
                creditNumber: creditNumber,
                creditValidate: validate,
            }
            let newArr = cardList;
            newArr.push(newCardBody);
            setPaymentCardList(newArr);
            navigation.navigate('PaymentCardList', {teste: "a"});
        } else {
            const filteredArray = cardList.filter(item => item.id !== idProp);
            const newCardBody = {
                id: filteredArray.length + 1,
                name: name,
                creditNumber: creditNumber,
                creditValidate: validate,
            }
            filteredArray.push(newCardBody);
            setPaymentCardList(filteredArray);
            navigation.navigate('PaymentCardList', {teste: "a"})
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cartão de Pagamento:</Text>
            <Image 
                style={styles.creditImage}
                source={{
                    uri: "https://www.melhoresdestinos.com.br/wp-content/uploads/2020/08/cartao-de-credito-pagbank-sem-anuidade-820x603.png",
                }}
            />
            <Text style={styles.h2}>Nome impresso no cartão:</Text>
            <CustomInput 
                value={name}
                onChange={input => setName(input)}
            /> 
            <Text style={styles.h2}>Número do cartao:</Text>
            <CustomInput 
                value={creditNumber}
                onChange={input => {
                    const parseData = removeNonLettersInput(input);
                    setCreditNumber(parseData);
                }}
            />
            <Text style={styles.h2}>Validade do cartão:</Text>
            <CustomInput 
                value={validate}
                onChange={input => setValidate(input)}
            />
            <PrimaryButton
                onPress={() => handleSaveButtonPress()}
            >Salvar</PrimaryButton>
            <SecondaryButton
                onPress={() => navigation.navigate('PaymentCardList')}
            >Voltar</SecondaryButton>
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
    creditImage: {
        width: 60,
    }
});