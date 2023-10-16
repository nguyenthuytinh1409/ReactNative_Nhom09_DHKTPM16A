import { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
export default function OnbordingPage1() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/1.png')} />
      <Text style={styles.text1}>
        Give people the power to build community and bring the world closer
        together.
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
