import { getDistance } from 'geolib';

interface Location {
  latitude: number;
  longitude: number;
}

export const calculateDistance = (loc1: Location, loc2: Location): number => {
  if (!loc1 || !loc2) {
    throw new Error('Both locations must be provided.');
  }

  const distanceInMeters = getDistance(loc1, loc2);
  return distanceInMeters / 1000;
};
