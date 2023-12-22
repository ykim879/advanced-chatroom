// CameraModal.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { googleCloudVisionApiKey } from "../apiKeys";
import { database } from "../config/firebase";
import {ref, uploadBytesResumable } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const AddPictureScreen = ({ onClose }) => {
  const [imageUri, setImageUri] = useState(null);
  const [label, setLabel] = useState([]);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      //Todo
      console.log("error", err);
      alert(err);
    }
  };

  const analyzeImage = async () => {
    try {
      //Todo: do loading
      if (!imageUri) {
        //Todo
        alert("Select Image First");
        return;
      }
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${googleCloudVisionApiKey}`;
      const imageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const requestData = {
        "requests":[
          {
            "image":{
              "content":imageData
            },
            "features":[
              {
                "type":"LABEL_DETECTION",
                "maxResults":1
              }
            ]
          }
        ]
      }
      const apiResponse = await axios.post(apiUrl, requestData);
      setLabel(apiResponse.data.responses[0].labelAnnotations);
      // const metadata = {
      //   contentType: apiResponse.data.responses[0].labelAnnotations,
      // };
      // const storageRef = ref(database, imageUri);
      // const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // // Listen for state changes, errors, and completion of the upload.
      // uploadTask.on("state_changed", (snapshot) => {
      //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //   const progress =
      //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log("Upload is " + progress + "% done");
      //   switch (snapshot.state) {
      //     case "paused":
      //       //Todo: alert
      //       console.log("Upload is paused");
      //       break;
      //     case "running":
      //       //Todo: alert
      //       console.log("Upload is running");
      //       break;
      //   }
      // });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.captureButton} onPress={pickImage}>
        <Text style={styles.captureButtonText}>Upload Picture</Text>
      </TouchableOpacity>
      {imageUri && (
        <>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 200, height: 200 }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={analyzeImage}>
            <Text style={styles.closeButtonText}>Send</Text>
          </TouchableOpacity>
        </>
      )}
      {label.length > 0 && (
        <>
        {label.map( (l) =>
        <Text key = {l.mid}>{l.description}</Text>)
        }
        </>
      )}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  camera: {
    width: "100%",
    height: 300,
    marginTop: 20,
  },
  captureButton: {
    backgroundColor: "#064420",
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
  },
  captureButtonText: {
    color: "white",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#B2C8BA",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default AddPictureScreen;
