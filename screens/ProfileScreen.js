import { StyleSheet, Text, View } from "react-native";
import { React, useState, useEffect } from "react";

import { KeyboardAvoidingView } from "react-native";

import { Button, Input, Image } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { getAuth, onAuthStateChanged , User , updateProfile} from "firebase/auth";





const ProfileScreen = ({ navigation }) => {

  const auth = getAuth();



  const [name, setName] = useState(auth?.currentUser?.displayName);
  const [photoURL, setphotoURL] = useState(auth?.currentUser?.photoURL);
  // const [user, setUser] = useState<User>();



  const save = () => {

    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name, photoURL: photoURL
      }).then(() => {
        // Profile updated!
        // ...
          navigation.navigate("Home")
      }).catch((error) => {
        // An error occurred
        // ...
      });


  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{ uri: auth?.currentUser?.photoURL || "https://icon-library.com/images/android-profile-icon/android-profile-icon-27.jpg" }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          value={name}
          onChangeText={(text) => setName(text)}
        ></Input>
        <Input
          placeholder="photoURL"
          value={photoURL}
          onChangeText={(text) => setphotoURL(text)}
        ></Input>
      </View>

      <Button containerStyle={styles.button} title="Save" onPress={save} />

    </KeyboardAvoidingView>
  );
};


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
  
export default ProfileScreen