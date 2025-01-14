import React from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {styles} from '../Styles/Styles';

interface CoordinateInputProps {
  inputLatitude: string;
  inputLongitude: string;
  setInputLatitude: (value: string) => void;
  setInputLongitude: (value: string) => void;
  onSearchCoordinates: () => void;
  onResetMarkers: () => void;
  onRequestLocation: () => void;
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({
  inputLatitude,
  inputLongitude,
  setInputLatitude,
  setInputLongitude,
  onSearchCoordinates,
  onResetMarkers,
  onRequestLocation,
}) => {
  return (
    <View style={styles.coordinateContainer}>
      <Text style={[styles.text, {textAlign: 'center'}]}>
        Enter Marker 2 Coordinates
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Latitude"
          placeholderTextColor={'#fff'}
          keyboardType="numeric"
          value={String(inputLatitude)}
          onChangeText={setInputLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitude"
          placeholderTextColor={'#fff'}
          keyboardType="numeric"
          value={String(inputLongitude)}
          onChangeText={setInputLongitude}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, {width: '100%', paddingVertical: 12}]}
        onPress={onSearchCoordinates}>
        <Text style={styles.buttonText}>Search Coordinates</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onResetMarkers}>
          <Text style={styles.buttonText}>Reset Markers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onRequestLocation}>
          <Text style={styles.buttonText}>
            Use Current Location for Marker 1
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CoordinateInput;
