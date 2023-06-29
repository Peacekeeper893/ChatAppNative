import { StyleSheet, Text, View } from "react-native";
import { React, useLayoutEffect, useState } from "react";
import { Button, Input } from "@rneui/themed";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../firebase";
const AddChat = ({ navigation }) => {

  console.log("ADd Chat")
  const [chatname, setchatname] = useState("");
  const [chatimg, setchatimg] = useState("");

  const createChat = async () => {
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatName: chatname,
        chatURL : chatimg,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    await navigation.navigate('Home' ,  {name:"new-chat"});

  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add new Chat",
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: {
        color: "black",
        fontWeight: "bold",
      },
      headerTintColor: "black",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter a chat Name"
        autoFocus
        value={chatname}
        onChangeText={(text) => setchatname(text)}
      ></Input>
      <Input
        placeholder="Image URL (optional)"
        value={chatimg}
        onChangeText={(text) => setchatimg(text)}
        onSubmitEditing={createChat}
      />
      <Button onPress={createChat} style={styles.button}>
        Create a new chat
      </Button>
    </View>
  );
};

export default AddChat;

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
    marginTop: 5,
  },
});
