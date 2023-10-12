import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import OnbordingPage1 from './screens/onbording_page_1'
import OnbordingPage2 from './screens/onbording_page_2'
import OnbordingPage3 from './screens/onbording_page_3'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <OnbordingPage1 /> */}
      {/* <OnbordingPage2 /> */}
      <OnbordingPage3 />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
