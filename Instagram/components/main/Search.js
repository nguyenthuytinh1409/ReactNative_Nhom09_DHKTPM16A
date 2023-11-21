import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default function Search(props) {
  const [users, setUsers] = useState([])

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data()
          const id = doc.id
          return { id, ...data }
        })
        setUsers(users)
      })
  }
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#ddd',
          padding: 10,
          margin: 10,
          borderRadius: 20,
          width: '90%',
          height: 40
        }}
      >
        <Image
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
          source={require('../../images/post1.jpg')}
        />
        <TextInput
          style={{
            fontSize: 20,
            backgroundColor: '#ddd',
            padding: 10,
            margin: 10,
            borderRadius: 20,
            width: '90%',
            height: 40
          }}
          placeholder="Type Here ..."
          onChangeText={(search) => fetchUsers(search)}
        />
      </View>

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Profile', { uid: item.id })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',

          width: '100%',
          height: 'auto',
          backgroundColor: '#ddd'
        }}
      >
        <Image
          style={{
            width: '33%',
            height: 100,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
          source={require('../../images/post1.jpg')}
        />
        <Image
          style={{
            width: '33%',
            height: 100,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
          source={require('../../images/post1.jpg')}
        />
        <Image
          style={{
            width: '33%',
            height: 100,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
          source={require('../../images/post1.jpg')}
        />
      </View>
    </View>
  )
}
