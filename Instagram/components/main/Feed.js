import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  ScrollView,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Ionic from 'react-native-vector-icons/Ionicons'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import Stories from '../auth/Stories'
import Post from '../auth/Post'

const Feed = () => {
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center'
        }}
      >
        <FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />
        <Text
          style={{
            fontFamily: 'Lobster-Regular',
            fontSize: 25,
            fontWeight: '500'
          }}
        >
          Instagram
        </Text>
        <Feather name="navigation" style={{ fontSize: 24 }} />
      </View>

      <ScrollView>
        <Stories />
        <Post />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
          }}
        >
          <Ionic
            name="ios-reload-circle-sharp"
            style={{ fontSize: 60, opacity: 0.2 }}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default Feed
