import { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
export default function OnbordingPage3() {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/3.png')} />
      <Text style={styles.text1}>
        Create, watch, and share short, entertaining videos called
      </Text>
      <Text style={styles.text2}>Reels </Text>
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
    width: 330,
    height: 390,
    marginTop: 20
  },
  text1: {
    width: 300,
    fontSize: 20,
    marginTop: 40,
    textAlign: 'center',
    color: '#000'
  },
  text2: {
    width: 300,
    fontSize: 23,
    marginTop: 0,
    textAlign: 'center',
    color: '#FF0000'
  }
})
