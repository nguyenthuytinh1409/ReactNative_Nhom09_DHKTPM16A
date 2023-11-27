import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionic from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo'


import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import Stories from "../auth/Stories";
import Post from "../auth/Post";
function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = [];
    if (
      props.usersFollowingLoaded == props.following.length &&
      props.following.length !== 0
    ) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });

      setPosts(props.feed);
    }
    console.log(posts);
  }, [props.usersFollowingLoaded, props.feed]);

  const onLikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };

  const onDislikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(userId)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: 'white', }}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center'
        }}
      >
        <FontAwesome name="plus-square-o" style={{ fontSize: 24 }} />
        <Text
          style={{
            fontFamily: 'Lobster-Regular',
            fontSize: 25,
            fontWeight: '500'
          }}
        >
          Instagram
        </Text>
        <Feather name="navigation" style={{ fontSize: 24 }} />
      </View>

      <ScrollView>
        <Stories />
      </ScrollView>
    </View>
      <View styles={styles.container}>
      <View styles={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              {/* <Text style={styles.container}>{}</Text> */}
              <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{  uri: item.downloadURL }}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
                <View style={{ paddingLeft: 5 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {item.user.name}
                  </Text>
                </View>
              </View>
              <Feather name="more-vertical" style={{ fontSize: 20 }} />
            </View>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 15
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.currentUserLike ? (
                <TouchableOpacity onPress={() => onDislikePress(item.user.uid, item.id)}>
                <AntDesign
                  name={item.currentUserLike ? 'heart' : 'hearto'}
                  style={{
                    paddingRight: 10,
                    fontSize: 20,
                    color: item.currentUserLike ? 'red' : 'black'
                  }}
                />
              </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => onLikePress(item.user.uid, item.id)}>
                <AntDesign
                  name={item.currentUserLike ? 'heart' : 'hearto'}
                  style={{
                    paddingRight: 10,
                    fontSize: 20,
                    color: item.currentUserLike ? 'red' : 'black'
                  }}
                />
              </TouchableOpacity>
              )}
                <TouchableOpacity>
                  <Ionic
                    name="ios-chatbubble-outline"
                    style={{ fontSize: 20, paddingRight: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name="navigation" style={{ fontSize: 20 }} />
                </TouchableOpacity>
              </View>
              <Feather name="bookmark" style={{ fontSize: 20 }} />
            </View>
            <Text
                style={{
                  fontWeight: '700',
                  fontSize: 14,
                  paddingVertical: 2
                }}
              >
                {item.caption}
              </Text>
            <Text style={{ opacity: 0.4, paddingVertical: 2 }} 
            onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid})}>
                View all comments
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{uri: item.downloadURL}}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 100,
                      backgroundColor: 'orange',
                      marginRight: 10
                    }}
                  />
                  <TextInput
                    placeholder="Add a comment "
                    style={{ opacity: 0.5 }}
                    onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid})}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Entypo
                    name="emoji-happy"
                    style={{
                      fontSize: 15,
                      color: 'lightgreen',
                      marginRight: 10
                    }}
                  />
                  <Entypo
                    name="emoji-neutral"
                    style={{ fontSize: 15, color: 'pink', marginRight: 10 }}
                  />
                  <Entypo
                    name="emoji-sad"
                    style={{ fontSize: 15, color: 'red' }}
                  />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
    <Post />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
          }}
        >
          <Ionic
            name="ios-reload-circle-sharp"
            style={{ fontSize: 60, opacity: 0.2 }}
          />
        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

export default connect(mapStateToProps, null)(Feed);
