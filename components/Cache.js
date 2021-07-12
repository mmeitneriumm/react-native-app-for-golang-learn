import AsyncStorage from "@react-native-async-storage/async-storage";

const cacheSet = async (key, value) => {
  await AsyncStorage.setItem(key, value);
};

const cacheGet = async (key) => {
  return await AsyncStorage.getItem(key);
};

const cacheClear = async () => {
  await AsyncStorage.clear();
};
export { cacheSet, cacheGet, cacheClear };
