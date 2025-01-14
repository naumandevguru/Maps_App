import {getDistance} from 'geolib';

interface Location {
  latitude: number;
  longitude: number;
}

export const calculateDistance = (loc1: Location, loc2: Location): number => {
  if (!loc1 || !loc2) {
    throw new Error('Both locations must be provided.');
  }
  // Calculate the distance in meters with high precision
  const distanceInMeters = getDistance(loc1, loc2, 0.01); //0.01 would calculate the distance with centimeter accuracy (1/100th of a meter).
  return distanceInMeters / 1000; // Convert to kilometers
};
