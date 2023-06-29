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

const CustomListItems = ({ id, chatName, enterChat }) => {

  const col = ":"
  
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
  )

  return (
    <ListItem onPress={() => enterChat(id , chatName) } key={id} bottomDivider>
          <Avatar
              rounded
              source={{
                uri:
                  chatMessages?.[0]?.photoURL ||
                  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
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