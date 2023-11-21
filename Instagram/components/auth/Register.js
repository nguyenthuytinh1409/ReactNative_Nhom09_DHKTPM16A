import React, { Component } from 'react'
import { View, Button, TextInput, Image, StyleSheet } from 'react-native'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { container, form } from '../styles'

export class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      name: ''
    }

    this.onSignUp = this.onSignUp.bind(this)
  }

  onSignUp() {
    const { email, password, name } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email
          })
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View>
        <View style={container.formCenter}>
          <Image
            style={styles.img}
            source={require('../../assets/insta.png')}
          />
          <TextInput
            style={form.textInput}
            placeholder="Name"
            onChangeText={(name) => this.setState({ name })}
          />
          <TextInput
            style={form.textInput}
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
          />
          <TextInput
            style={form.textInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
          />
          <Button onPress={() => this.onSignUp()} title="Sign Up" />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  img: {
    width: '90%',
    height: 100,
    marginTop: 80,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
})
export default Register
