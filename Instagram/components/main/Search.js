import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView
} from 'react-native'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import SearchContent from '../auth/SearchContent'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionic from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

export default function Search(props) {
  const [users, setUsers] = useState([])
  const [image, setImage] = useState(null)
  const windowWidth = Dimensions.get('window').width
  const windoeHeight = Dimensions.get('window').height
  const getData = (data) => {
    setImage(data)
  }
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}
    >
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
              margin: 10,
              borderRadius: 20,
              width: '100%',
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

        <SearchContent data={getData} />
        <TouchableOpacity
          style={{
            margin: 25,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <AntDesign
            name="pluscircleo"
            style={{ fontSize: 40, opacity: 0.5 }}
          />
        </TouchableOpacity>

        {image ? (
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(52,52,52,0.8)'
            }}
          >
            <StatusBar backgroundColor="#525252" barStyle="dark-content" />
            <View
              style={{
                position: 'absolute',
                top: windoeHeight / 6,
                left: windowWidth / 18,
                backgroundColor: 'white',
                width: '90%',
                height: 465,
                borderRadius: 15,
                zIndex: 1,
                elevation: 50
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 15
                }}
              >
                <Image
                  source={image}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 100
                  }}
                />
                <View style={{ paddingLeft: 8 }}>
                  <Text style={{ fontSize: 12, fontWeight: '600' }}>
                    the_anonymous_guy
                  </Text>
                </View>
              </View>
              <Image source={image} style={{ width: '100%', height: '80%' }} />
              <View
                style={{
                  justifyContent: 'space-around',
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 8
                }}
              >
                <Ionic name="ios-heart-outline" style={{ fontSize: 26 }} />
                <Ionic
                  name="ios-person-circle-outline"
                  style={{ fontSize: 26 }}
                />
                <Feather name="navigation" style={{ fontSize: 26 }} />
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}
