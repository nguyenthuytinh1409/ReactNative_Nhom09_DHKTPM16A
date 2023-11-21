import React from 'react'
import { Button, Text, View, Image, StyleSheet, Pressable } from 'react-native'

export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Image style={styles.img} source={require('../../assets/insta.png')} />
      <Text
        style={{
          width: '90%',
          fontSize: 13,
          marginTop: 20,
          textAlign: 'center',
          color: '#000'
        }}
      >
        Sign up to see photos videos and reels from your friends..
      </Text>
      <Pressable
        title="Register"
        style={{
          marginTop: 10,
          backgroundColor: '#0095f6',
          borderRadius: 5,
          padding: 10,
          width: '90%',
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center'
        }}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={{ color: 'white', fontSize: 25 }}>REGISTER</Text>
      </Pressable>
      <Pressable
        title="Register"
        style={{
          marginTop: 10,
          backgroundColor: '#0095f6',
          borderRadius: 5,
          padding: 10,
          width: '90%',
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center'
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: 'white', fontSize: 25 }}>LOGIN</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  img: {
    width: '90%',
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})
