import { StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect } from "react";

import { KeyboardAvoidingView } from "react-native";

import { Button, Input, Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { getAuth, onAuthStateChanged , User} from "firebase/auth";

import {  signInWithEmailAndPassword } from "firebase/auth";

// import { auth } from '../firebase.js';




const LoginScreen = ({ navigation }) => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState<User>();


  useEffect(() => {


    const auth = getAuth();
    const unsubscribe = async () => {
      await onAuthStateChanged(auth, (user) => {
  
        // console.log(user)
        if (user) {
          const uid = user.uid;
          navigation.replace("Home");
          // ...
        } else {
          // User is signed out
          // ...
  
          console.log("User is not signed in")
        }
      })
    };


    unsubscribe();

  }, []);

  const signIn = () => {

    const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
  });


  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://www.howtogeek.com/wp-content/uploads/2022/10/Google-Messages-2022-Hero.jpg?height=200p&trim=2,2,2,2&crop=16:9",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        ></Input>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        ></Input>
      </View>

      <Button containerStyle={styles.button} title="Login" onPress={signIn} />
      <Button
        title="Register"
        containerStyle={styles.button}
        type="outline"
        onPress={() => navigation.navigate("Register")}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
    marginTop: 10,
  },
  button: {
    width: 200,
    marginTop: 5,
  },
});