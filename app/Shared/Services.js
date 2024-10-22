import AsyncStorage from '@react-native-async-storage/async-storage';

const setUserAuth = async (value) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(value));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

const getUserAuth = async () => {
  try {
    const value = await AsyncStorage.getItem('userData');
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

const Logout = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

export default {
  setUserAuth,
  getUserAuth,
  Logout,
};