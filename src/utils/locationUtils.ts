import {Alert, PermissionsAndroid, Platform} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Permission',
        message: 'We need access to your location to provide information.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission Denied', 'Location access is required.');
      return false;
    }
  }
  return true;
};

export const getCurrentLocation = (
  onSuccess: (location: Location) => void,
  onError: (errorMessage: string) => void,
) => {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: false,
    locationProvider: Platform.OS === 'android' ? 'playServices' : 'auto',
  });

  Geolocation.getCurrentPosition(
    (position: GeolocationResponse) => {
      if (position?.coords) {
        const {latitude, longitude} = position.coords;
        const newLocation: Location = {
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        };
        onSuccess(newLocation);
      } else {
        onError('Location data unavailable.');
      }
    },
    error => {
      if (error.code === error.TIMEOUT) {
        Geolocation.getCurrentPosition(
          (position: GeolocationResponse) => {
            const {latitude, longitude} = position.coords;
            const newLocation: Location = {
              latitude,
              longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            };
            onSuccess(newLocation);
          },
          error => {
            onError(error.message), console.log(error);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 5000,
          },
        );
      } else if (error.code === 2) {
        console.log(error);
        onError('Please enable GPS to use this feature.');
      } else {
        console.log(error);
        onError(error.message);
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    },
  );
};
