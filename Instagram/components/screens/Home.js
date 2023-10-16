import { View, Text, StatusBar } from "react-native";
import React from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-web";
import Stories from "../sreensComponents/Stories";

const Home = () => {
  return (
    <View style={{
      backgroundColor: "white",
      height: '100%',
    }}> 
      <StatusBar backgroundColor="white" barStyle="dark-conent" />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 15,
          alignContent: "center",
        }}
      >
        <FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />
        <Text
          style={{
            fontFamily: "Lobster-Regular",
            fontSize: 25,
            fontWeight: "500",
          }}
        >
          Instagram
        </Text>
        <Feather name="navigation" style={{fontSize: 24}} />
      </View>
      <ScrollView>
        <Stories></Stories>
      </ScrollView>
    </View>
  );
};

export default Home;
