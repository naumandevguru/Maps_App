import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Styles/Styles';

interface InfoPanelProps {
  selectingMarker: 'marker1' | 'marker2';
  marker1: {latitude: number; longitude: number};
  marker2: {latitude: number; longitude: number};
  distance: number;
  onToggleMapType: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({
  selectingMarker,
  marker1,
  marker2,
  distance,
  onToggleMapType,
}) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.text, {textAlign: 'center'}]}>
        Marker Selecting:
        <Text style={styles.textValue}>
          {selectingMarker === 'marker1' ? ' Marker 1' : ' Marker 2'}
        </Text>
      </Text>
      <View style={styles.detailsRow}>
        <View style={{width: '60%'}}>
          <Text style={styles.text}>
            Marker 1:
            <Text style={styles.textValue}>
              {` ${marker1.latitude.toFixed(4)}, ${marker1.longitude.toFixed(
                4,
              )}`}
            </Text>
          </Text>
          <Text style={styles.text}>
            Marker 2:
            <Text style={styles.textValue}>
              {` ${marker2.latitude.toFixed(4)}, ${marker2.longitude.toFixed(
                4,
              )}`}
            </Text>
          </Text>
          <Text style={styles.text}>
            Distance:
            <Text style={styles.textValue}>
              {distance ? ` ${distance.toFixed(2)} km` : 'Calculating...'}
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, {height: 40, width: '32%'}]}
          onPress={onToggleMapType}>
          <Text style={styles.buttonText}>Toggle Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InfoPanel;
