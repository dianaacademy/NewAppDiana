import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import { Colors } from '../constants/Colors'
  import Ionicons from "react-native-vector-icons/Ionicons";
  import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
  import { useNavigation } from "@react-navigation/native";
  
  const LoginScreenSS = () => {
    const navigation = useNavigation();

    const [secureEntery, setSecureEntery] = useState(true);
  
    const handleGoBack = () => {
      navigation.goBack();
    };

   
    const handleSignup = () => {
      navigation.navigate("SignupSS");
    };
    const handleForgot = () => {
      navigation.navigate("Forgotpass");
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
        {/* form  */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons name={"mail-outline"} size={30} color={Colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor={Colors.secondary}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <SimpleLineIcons name={"lock"} size={30} color={Colors.secondary} />
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor={Colors.secondary}
              secureTextEntry={secureEntery}
            />
            <TouchableOpacity
              onPress={() => {
                setSecureEntery((prev) => !prev);
              }}
            >
              <SimpleLineIcons name={"eye"} size={20} color={Colors.secondary} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleForgot}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButtonWrapper}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.continueText}>or</Text>
          <TouchableOpacity style={styles.googleButtonContainer}>
          <SimpleLineIcons name={"screen-smartphone"} size={30} color={Colors.secondary} />
            <Text style={styles.googleText}>Login with OTP</Text>
          </TouchableOpacity>
          <Text style={styles.continueText}>or continue with</Text>
          <TouchableOpacity style={styles.googleButtonContainer}>
            <Image
              source={require("../assets/google.png")}
              style={styles.googleImage}
            />
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.accountText}>Don’t have an account?</Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.signupText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  
  export default LoginScreenSS;
  
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
      backgroundColor: Colors.primary,
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