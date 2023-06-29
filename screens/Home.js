import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import CustomListItems from "../components/CustomListItems";

import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { db } from "../firebase";

import { getAuth, signOut } from "firebase/auth";
import { Avatar } from "@rneui/themed";
// import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const Home = ({ navigation , route }) => {
  const [chats, setChats] = useState([]);

  console.log("Home");

  useEffect(() => {

    console.log("Here")
    const read = async () => {
      const querySnapshot = await getDocs(collection(db, "chats"));
      querySnapshot.forEach((doc) => {
        setChats(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
    

    read();
  }, [route.params]);



  const auth = getAuth();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
        alert(error.message);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Your Chats",
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: {
        color: "black",
        fontWeight: "bold",
        
      },
      headerTintColor: "black",
      headerLeft: () => (
        <TouchableOpacity
          
        onPress={() => {
          signOutUser();
        }}

          
          style={{
            marginRight:9,
          }}
        >
          <Avatar
            rounded
            source={{ uri: auth?.currentUser?.photoURL || "https://icon-library.com/images/android-profile-icon/android-profile-icon-27.jpg" }}
            size={45}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}
          onPress={() => {
            signOutUser();
          }}
>
            <AntDesign name="logout" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("AddChat");
            }}
          >

            <AntDesign name="pluscircle" size={24}></AntDesign>
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);


  const enterChat = (id, chatName, chatURL) => {
     
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
      chatURL:chatURL,
    })
   }

  return (
    <SafeAreaView>
      <ScrollView>

        {chats.map(({ id, data: { chatName , chatURL } }) => (
          
          <CustomListItems key={id} id={id} chatName={chatName} chatURL={chatURL} enterChat={enterChat}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
