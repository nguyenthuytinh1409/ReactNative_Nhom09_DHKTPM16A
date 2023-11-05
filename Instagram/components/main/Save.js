import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Button } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

export default function Save(props, { navigation }) {
  const [caption, setCaption] = useState('');

  const uploadImage = async () => {
    const uri = props.route.params.image;
    const childPath = `post/${getAuth().currentUser.uid}/${Math.random().toString(36)}`;
    console.log(childPath);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(getStorage(), childPath);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    const unsubscribe = uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      switch (snapshot.state) {
        case 'paused':
          console.log ('Upload is paused')
          break;
        case 'running':
          console.log('Upload is running');
          break;
        default:
          break;
      }
    }, (error) => {
      console.error(error);
    }, async () => {
      // Upload completed successfully
      console.log('Upload complete');
      // Get the download URL from the storageRef
      const downloadURL = await getDownloadURL(storageRef);
      console.log('File available at', downloadURL);
      savePostData(downloadURL);
    });
  };

  const savePostData = async (downloadURL) => {
    const userPostsRef = collection(getFirestore(), 'posts', getAuth().currentUser.uid, 'userPosts');
    await addDoc(userPostsRef, {
      downloadURL,
      caption,
      creation: serverTimestamp(),
    });
    props.navigation.popToTop();
};

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write a Caption . . ."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
