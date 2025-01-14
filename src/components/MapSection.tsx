import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {styles} from '../styles/Styles';

interface MarkerPosition {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapSectionProps {
  marker1: MarkerPosition;
  marker2: MarkerPosition;
  mapType: 'standard' | 'satellite' | 'terrain';
  onMarkerDrag: (
    marker: 'marker1' | 'marker2',
    latitude: number,
    longitude: number,
  ) => void;
  onMapPress: (coordinate: {latitude: number; longitude: number}) => void;
  onMapReady: () => void;
}

const MapSection = forwardRef((props: MapSectionProps, ref) => {
  const {marker1, marker2, mapType, onMarkerDrag, onMapPress, onMapReady} =
    props;
  const mapRef = useRef<MapView | null>(null);

  const moveToMarker = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude,
          longitude,
          latitudeDelta: marker1.latitudeDelta,
          longitudeDelta: marker1.longitudeDelta,
        },
        1000,
      );
    }
  };

  useImperativeHandle(ref, () => ({
    moveToMarker,
  }));

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      region={marker1}
      mapType={mapType}
      onMapReady={onMapReady}
      onPress={e => onMapPress(e.nativeEvent.coordinate)}>
      <Marker
        coordinate={marker1}
        draggable
        onDragEnd={e => {
          const {latitude, longitude} = e.nativeEvent.coordinate;
          onMarkerDrag('marker1', latitude, longitude);
        }}
      />
      <Marker
        coordinate={marker2}
        draggable
        onDragEnd={e => {
          const {latitude, longitude} = e.nativeEvent.coordinate;
          onMarkerDrag('marker2', latitude, longitude);
        }}
      />
      <Polyline
        coordinates={[
          {latitude: marker1.latitude, longitude: marker1.longitude},
          {latitude: marker2.latitude, longitude: marker2.longitude},
        ]}
        strokeColor="#3B1C32"
        strokeWidth={3}
      />
    </MapView>
  );
});

export default MapSection;
