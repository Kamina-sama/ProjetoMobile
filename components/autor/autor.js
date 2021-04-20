import AsyncStorage from "@react-native-async-storage/async-storage";

class AutorStorage{
    storeData = async (value, key) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key,jsonValue);
            return true;
        } catch (e) {
            return e;
        }
    }
    
    getData = async (value) => {
        try {
            const jsonValue = await AsyncStorage.getItem(value);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            return e;
        }
    }

    getAllKeys = async () => {
        try {
            const result = await AsyncStorage.getAllKeys();
            return result;
        } catch (e) {
            return e;
        }
    }

    multiGet = async (keys) => {
        let values;
        try {
            values = await AsyncStorage.multiGet(keys);
            return values;
        } catch (error) {
            return error;
        }
    }
}

export default AutorStorage;