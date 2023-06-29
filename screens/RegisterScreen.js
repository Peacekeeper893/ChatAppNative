import { StyleSheet, KeyboardAvoidingView, View } from "react-native";
import {React , useLayoutEffect, useState} from "react";
import { Button, Input, Text } from "@rneui/themed";

import { getAuth , createUserWithEmailAndPassword} from "firebase/auth";

import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

import {
  updateProfile,
} from '../firebase'

const RegisterScreen = ({ navigation }) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  
  const register = () => {

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name,
      photoURL: img,
    })
      .then(() => console.log('Profile Updated!'))
      .catch((error) => console.log(error.message))
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
    
  }


  useLayoutEffect(() => {

    // navigation.setOptions
    

  },[navigation])

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light"></StatusBar>

      <Text h3 style={{ marginBottom: 50 }}>
        Create an Account
      </Text>

      <View style={styles.inputContainer}>
        
      <Input
          placeholder="Full Name"
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
      <Input
          placeholder="Email"
          
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      <Input
          placeholder="Image URL (optional)"
          value={img}
          onChangeText={(text) => setImg(text)}
          onSubmitEditing={register}
        />

      </View>

      <Button raised title="Register"
        onPress={register}
        containerStyle={styles.button} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  button: {

    width: 200,
    marginTop:10,

  },
  inputContainer: {
    width: 300,
  },
});
