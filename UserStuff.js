import AsyncStorage from '@react-native-async-storage/async-storage';

async function createUser(user, email, senha) {
    let integerString=await AsyncStorage.getItem('nextUserId');
    if(integerString===null) {
       integerString='0';
       await AsyncStorage.setItem('nextUserId',integerString); 
    }
    const obj={user,email,senha};
    await AsyncStorage.setItem(integerString, JSON.stringify(obj));
    await AsyncStorage.setItem('nextUserId', (parseInt(integerString)+1).toString());
    return integerString.toString();
}
async function setCurrentUser(id) {
    await AsyncStorage.setItem('currentUser', id.toString());
}
async function logOut() {
    await AsyncStorage.removeItem('currentUser');
}

export {createUser, setCurrentUser, logOut};