import AsyncStorage from "@react-native-async-storage/async-storage";


class EditoraStorage{
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

    removeItem = async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            return error;
        }
    }

    multiRemove = async (keys) => {
        try {
            await AsyncStorage.multiRemove(keys);
        } catch (error) {
            return error;
        }
    }
}

export default EditoraStorage;