import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native'
export default function Explore() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.input} placeholder="Search" />
        <Button title="Search" />
      </View>
    </View>
  )
}
