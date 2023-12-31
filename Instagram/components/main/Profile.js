import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Button,
  ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { ProfileBody, ProfileButtons } from '../auth/ProfileBody'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

function Profile(props) {
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  const [following, setFollowing] = useState(false)

  useEffect(() => {
    const { currentUser, posts } = props
    console.log('sad')

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser)
      setUserPosts(posts)
    } else {
      firebase
        .firestore()
        .collection('users')
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data())
          } else {
            console.log('does not exist')
          }
        })
      firebase
        .firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data()
            const id = doc.id
            return { id, ...data }
          })
          setUserPosts(posts)
        })
    }
    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true)
    } else {
      setFollowing(false)
    }
  }, [props.route.params.uid, props.following])

  const onFollow = () => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(props.route.params.uid)
      .set({})
  }
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(props.route.params.uid)
      .delete()
  }

  const onLogout = () => {
    firebase.auth().signOut()
  }
  if (user === null) {
    return <View />
  }

  return (
    <View styles={styles.container}>
      <View styles={styles.containerInfo}>
        {/* <Text>{user.name}</Text>
        <Text>{user.email}</Text> */}
        <View style={{ width: '100%', padding: 10 }}>
          <ProfileBody
            name="Mr Peobody"
            accountName="mr_peobody"
            profileImage={require('../../images/post1.jpg')}
            followers="3.6M"
            following="35"
            post="458"
          />
          <ProfileButtons
            id={0}
            name="Mr Peobody"
            accountName="mr_peobody"
            profileImage={require('../../images/post1.jpg')}
          />
        </View>
        <View>
          <Text
            style={{
              padding: 10,
              letterSpacing: 1,
              fontSize: 14
            }}
          >
            Story Highlights
          </Text>
        </View>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button title="Following" onPress={() => onUnfollow()} />
            ) : (
              <Button title="Follow" onPress={() => onFollow()} />
            )}
          </View>
        ) : (
          <Button title="Logout" onPress={() => onLogout()} />
        )}
      </View>
      <View styles={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerInfo: {
    margin: 20
  },
  containerGallery: {
    flex: 1
  },
  containerImage: {
    flex: 1 / 3
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1
  }
})

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following
})

export default connect(mapStateToProps, null)(Profile)
