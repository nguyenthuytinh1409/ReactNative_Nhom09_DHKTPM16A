import React, { useState } from 'react'
import { View, Button, TextInput, Text, Image, StyleSheet } from 'react-native'
import { container, form } from '../styles'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export default function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSignUp = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  }

  return (
    <View style={container.center}>
      <View style={container.formCenter}>
        <Image style={styles.img} source={require('../../assets/insta.png')} />
        <TextInput
          style={form.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={form.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <Button
          style={form.button}
          onPress={() => onSignUp()}
          title="Sign In"
        />
      </View>
      <View style={form.bottomButton}>
        <Text
          title="Register"
          onPress={() => props.navigation.navigate('Register')}
        >
          Don't have an account? SignUp.
        </Text>
      </View>
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
