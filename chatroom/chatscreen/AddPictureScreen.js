// CameraModal.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo-image-picker';

const AddPictureScreen = ({ onClose }) => {

  return (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.captureButton}>
        <Text style={styles.captureButtonText}>Upload Picture</Text>
      </TouchableOpacity>
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
