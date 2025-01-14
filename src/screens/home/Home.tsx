import React, {useState, useEffect, useCallback, useRef} from 'react';
import {View, Alert} from 'react-native';
import {styles} from '../../styles/Styles';
import MapSection from '../../components/MapSection';
import InfoPanel from '../../components/InfoPanel';
import CoordinateInput from '../../components/CoordinateInput';
import {
  getCurrentLocation,
  requestLocationPermission,
} from '../../utils/locationUtils';
import {calculateDistance} from '../../utils/distanceUtils';

interface MarkerPosition {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Markers {
  marker1: MarkerPosition;
  marker2: MarkerPosition;
}
// Initial positions for the two markers.
const INITIAL_MARKERS = {
  marker1: {
    latitude: 31.4846334,
    longitude: 74.3256691,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
  marker2: {
    latitude: 31.532101,
    longitude: 74.351936,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
};

const Home: React.FC = () => {
  // State to manage marker positions.
  const [markers, setMarkers] = useState<Markers>({
    marker1: INITIAL_MARKERS.marker1,
    marker2: INITIAL_MARKERS.marker2,
  });
  const [selectingMarker, setSelectingMarker] = useState<'marker1' | 'marker2'>(
    'marker1',
  );
  const [distance, setDistance] = useState<number>(0);
  const [inputLatitude, setInputLatitude] = useState<string>('');
  const [inputLongitude, setInputLongitude] = useState<string>('');
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain'>(
    'standard',
  );
  // Ref for accessing and interacting with the map component.
  const mapRef = useRef<{
    moveToMarker: (latitude: number, longitude: number) => void;
  } | null>(null);

  // Function to calculate the distance between the two markers.
  const handleCalculateDistance = useCallback(() => {
    const distanceInKm = calculateDistance(markers.marker1, markers.marker2);
    setDistance(distanceInKm);
  }, [markers]);

  // Function to get the user's current location and update marker1's position.
  const handleGetLocation = useCallback(async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) return;

    getCurrentLocation(
      location => {
        setMarkers(prev => ({
          ...prev,
          marker1: location,
        }));
        mapRef.current?.moveToMarker(location?.latitude, location?.longitude);
      },
      errorMessage => {
        Alert.alert('Error', errorMessage);
      },
    );
  }, []);

  // Initial location fetch when the component mounts.
  useEffect(() => {
    handleGetLocation();
  }, [handleGetLocation]);

  // Recalculate distance whenever markers are updated.
  useEffect(() => {
    handleCalculateDistance();
  }, [markers, handleCalculateDistance]);

  // Function to toggle between different map types.
  const toggleMapType = useCallback(() => {
    setMapType(prevType => {
      if (prevType === 'standard') return 'satellite';
      if (prevType === 'satellite') return 'terrain';
      return 'standard';
    });
  }, []);

  // Function to handle marker drag and update its position.
  const handleMarkerDrag = useCallback(
    (marker: 'marker1' | 'marker2', latitude: number, longitude: number) => {
      setMarkers(prev => ({
        ...prev,
        [marker]: {...prev[marker], latitude, longitude},
      }));
    },
    [],
  );

  // Function to handle taps on the map and update marker positions.
  const handleMapPress = useCallback(
    (coordinate: {latitude: number; longitude: number}) => {
      const {latitude, longitude} = coordinate;
      setMarkers(prev => ({
        ...prev,
        [selectingMarker]: {
          ...prev[selectingMarker],
          latitude,
          longitude,
        },
      }));
      setSelectingMarker(prev => (prev === 'marker1' ? 'marker2' : 'marker1'));
    },
    [selectingMarker],
  );

  // Function to search for coordinates entered by the user.
  const handleSearchCoordinates = useCallback(() => {
    const lat = parseFloat(inputLatitude);
    const lng = parseFloat(inputLongitude);
    if (isNaN(lat) || isNaN(lng)) {
      Alert.alert(
        'Invalid Coordinates',
        'Please enter valid latitude and longitude values.',
      );
      return;
    }
    setMarkers(prev => ({
      ...prev,
      marker2: {...prev.marker2, latitude: lat, longitude: lng},
    }));
    mapRef.current?.moveToMarker(lat, lng);
  }, [inputLatitude, inputLongitude]);

  // Function to reset markers to their initial positions.
  const resetMarkers = () => {
    setMarkers(INITIAL_MARKERS);
  };

  return (
    <View style={styles.container}>
      {/* Map section to display the map and markers */}
      <MapSection
        ref={mapRef}
        marker1={markers.marker1}
        marker2={markers.marker2}
        mapType={mapType}
        onMarkerDrag={handleMarkerDrag}
        onMapPress={handleMapPress}
        onMapReady={handleCalculateDistance}
      />
      {/* Info panel to display marker info and distance */}
      <InfoPanel
        selectingMarker={selectingMarker}
        marker1={markers.marker1}
        marker2={markers.marker2}
        distance={distance}
        onToggleMapType={toggleMapType}
      />
      {/* Input section for latitude and longitude */}
      <CoordinateInput
        inputLatitude={inputLatitude}
        inputLongitude={inputLongitude}
        setInputLatitude={setInputLatitude}
        setInputLongitude={setInputLongitude}
        onSearchCoordinates={handleSearchCoordinates}
        onResetMarkers={resetMarkers}
        onRequestLocation={handleGetLocation}
      />
    </View>
  );
};

export default Home;
