import React, { useState } from "react";
import { View, Button, TextInput, Text } from "react-native";
import { container, form } from "../styles";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUp = () => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };

  return (
    <View style={container.center}>
      <View style={container.formCenter}>
        <TextInput
          style={form.textInput}
          placeholder="email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={form.textInput}
          placeholder="password"
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
          onPress={() => props.navigation.navigate("Register")}
        >
          Don't have an account? SignUp.
        </Text>
      </View>
    </View>
  );
}
