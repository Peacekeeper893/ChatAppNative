import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { ListItem , Avatar } from '@rneui/themed'
import { useState } from 'react';
import { useEffect } from 'react';

import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from '../firebase'

const CustomListItems = ({ id, chatName,chatURL , enterChat }) => {

  const col = ":"

  console.log("OOPS Just had a FUCKY-WUCKY");
  
  const [chatMessages, setChatMessages] = useState([])
  const db = getFirestore()

  useEffect(() =>
    onSnapshot(
      query(
        collection(db, `chats/${id}`, 'messages'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setChatMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
      }
    )
  ,[])

  return (
    <ListItem onPress={() => enterChat(id , chatName , chatURL) } key={id} bottomDivider>
          <Avatar
              rounded
              source={{
                uri:
                  chatURL ||
                  "https://play-lh.googleusercontent.com/8A8bzW__Xk36ceYu5hYtW6oxeZ5sP38q2Ll07b1rhFzHPF8xy4kzFVve7Mm_y-34d-yF",
              }}
          />

          <ListItem.Content>
              <ListItem.Title style={{fontWeight:"800"}}>
                  {chatName}
              </ListItem.Title>

              <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName} {chatMessages.length === 0 ? "" : ":"} {chatMessages?.[0]?.message}
                  
              </ListItem.Subtitle>
        </ListItem.Content>

    </ListItem>
  )
}

export default CustomListItems

const styles = StyleSheet.create({})