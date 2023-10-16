import { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
export default function OnbordingPage2() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/2.png')} />
      <Text style={styles.text1}>
        You can share your Photos, Chat with your Friends & can Likes, Comments
        & go to Live.
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
    padding: 10
  },
  img: {
    width: 315,
    height: 236,
    marginTop: 130
  },
  text1: {
    width: 300,
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
    color: '#000'
  }
})
