import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import { Colors } from '../constants/Colors';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useAuth } from './Context/AuthContext';
import { auth, firestore } from '../firebase.config';
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithCredential 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import Services from './Shared/Services';  // Import Services for storing user data

WebBrowser.maybeCompleteAuthSession();

const LoginScreenSS = () => {
  const navigation = useNavigation();
  const { setUserData } = useAuth();  // Destructure the userData setter from AuthContext
  const [secureEntry, setSecureEntry] = useState(true);
  const [accessToken, setAccessToken] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '133537517881-4nrfab29k0mfaqdfvqqitnhpgd84codd.apps.googleusercontent.com',
    expoClientId: '133537517881-qcrptltqo3q52e665e0mdsh4q5vc8pu4.apps.googleusercontent.com'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
      getUserData(response.authentication.accessToken);
    }
  }, [response]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getUserData = async (token) => {
    try {
      setIsLoading(true);
      const resp = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await resp.json();
      console.log("User Details", user);
      
      await Services.setUserAuth(user);  // Store user data using services.js
      setUserData(user);  // Set the user data in the AuthContext

      // Sign in to Firebase with Google credential
      const credential = GoogleAuthProvider.credential(null, token);
      const userCredential = await signInWithCredential(auth, credential);
      const firebaseUser = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(firestore, 'users', firebaseUser.uid), {
        email: user.email,
        name: user.name,
        picture: user.picture,
      }, { merge: true });
      console.log("login sucessfull");
      // Navigate to the main app screen
      navigation.navigate('Home');

    } catch (error) {
      console.error("Error during Google Sign In:", error);
      Alert.alert("Sign In Error", "An error occurred during Google Sign In. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert("Login Error", "Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store user data in Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        lastLogin: new Date(),
      }, { merge: true });

      await Services.setUserAuth(user);  // Store user data using services.js
      setUserData(user);  // Set the user data in the AuthContext

      // Navigate to the main app screen
      navigation.navigate('Home');
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Error", error.message || "An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSignup = () => {
    navigation.navigate("SignupSS");
  };

  const handleForgot = () => {
    navigation.navigate("Forgotpass");
  };
  const handleMob = () => {
    navigation.navigate("OTPLogin");
  };

  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={"arrow-back-outline"}
          color={Colors.primary}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={Colors.secondary} />
          <TextInput
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={Colors.secondary}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={Colors.secondary} />
          <TextInput
            style={styles.textInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={Colors.secondary}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntry((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={secureEntry ? "eye" : "eye-off"} size={20} color={Colors.secondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleForgot}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleEmailLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator style={styles.loginButtonWrapper} />
            
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.continueText}>or</Text>
        <TouchableOpacity style={styles.googleButtonContainer} onPress={handleMob}>
          <SimpleLineIcons name={"screen-smartphone"} size={30} color={Colors.secondary} />
          <Text style={styles.googleText}>Login with OTP</Text>
        </TouchableOpacity>
        <Text style={styles.continueText}>or continue with</Text>

        <TouchableOpacity style={styles.googleButtonContainer}
          onPress={() => promptAsync()} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <View style={styles.googleButtonContent}>
              <Image
                source={require("../assets/google.png")}
                style={styles.googleImage}
              />
              <Text style={styles.googleText}>Google</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 25,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: Colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: Colors.primary,
    fontFamily: 'outfit-bold',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: 'outfit',
  },
  forgotPasswordText: {
    textAlign: "right",
    color: Colors.primary,
    fontFamily: 'outfit',
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: 'outfit',
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: 'outfit',
    color: Colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: 'outfit',
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: Colors.primary,
    fontFamily: 'outfit',
  },
  signupText: {
    color: Colors.primary,
    fontFamily: 'outfit',
  },
});

export default LoginScreenSS;