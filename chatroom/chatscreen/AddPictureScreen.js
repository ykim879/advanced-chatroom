// CameraModal.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { googleCloudVisionApiKey } from '../apiKeys';

const AddPictureScreen = ({ onClose }) => {

  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }
      );
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      //Todo
      console.log("error", err);
    }
  }

  const analyzeImage = async () => {
    try {
      if (!imageUri) {
        //Todo
        alert("Select Image First");
        return;
      }
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${googleCloudVisionApiKey}`;
      const imageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      })

      const requestData = {
        requests: [
          {
            image: {
              content: imageData,
            },
            features: [{type: 'LABEL_DETECTION', maxResult: 5}],
          }
        ]
      }

      const apiResponse = await axios.post(apiUrl, requestData);
      console.log(apiResponse.data.responses[0].labelAnnotations);
    } catch (err) {
      //Todo
    }
  }
  return (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.captureButton} onPress={pickImage}>
        <Text style={styles.captureButtonText}>Upload Picture</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source = {{uri: imageUri}} style= {{width: 200, height: 200}}/>
      )}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  camera: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  captureButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginVertical: 20,
  },
  captureButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AddPictureScreen;
