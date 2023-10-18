import { View, Text, StatusBar, ScrollView } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Stories from "../sreensComponents/Stories";
import Post from "../sreensComponents/Post";

const Home = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
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
        <Feather name="navigation" style={{ fontSize: 24 }} />
      </View>
      <ScrollView>
        <Stories />
        <Post />
      </ScrollView>
    </View>
  );
};

export default Home;
