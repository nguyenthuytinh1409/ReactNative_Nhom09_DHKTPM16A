import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import SearchContent from '../auth/SearchContent'

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
      <ScrollView>
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
            source={require('../../images/icon.png')}
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
              <Text style={{ fontSize: 20 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <SearchContent />
      </ScrollView>
    </View>
  )
}
