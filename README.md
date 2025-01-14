# Maps App - React Native

This is a React Native app that integrates Google Maps functionality, allowing users to interact with maps, place markers, calculate distances between them, and change map types. The app fetches the user's current location and allows searching for coordinates.
## Features

- **Current Location:** Fetches the user's current location and places a marker on the map.
- **Markers:** Allows users to move markers on the map and calculate the distance between them.
- **Map Types:** Users can toggle between standard, satellite, and terrain map views.
- **Coordinate Search:** Allows users to input latitude and longitude values and move the second marker to those coordinates.
- **Distance Calculation:** Calculates the distance (in kilometers) between two markers.
## Requirements

- Google Maps API Key
- Device with GPS (for location features)
## Installation
    
1. Clone the repository:

```bash
git clone https://github.com/naumandevguru/MapsProject.git
```
2. Navigate to the project directory:

```bash
cd MapsProject
```

3. Install the dependencies:

```bash
yarn install
```

4. Set up your Google Maps API key by following the official Google Maps setup guide.

5. Start the development server:

```bash
yarn start --reset-cache
```

6. Run the app on a device or emulator:

For iOS:

```bash
npx react-native run-ios
```

For Android:

```bash
npx react-native run-android
```
## Components

**`App.tsx`**

The main entry point of the app. It sets up the theme and displays the Home screen.

**`Home.tsx`**

The home screen that includes:

- **MapSection:** Displays the map with markers.

- **InfoPanel:** Shows information about the current markers and distance between them.

- **CoordinateInput:** Allows the user to input coordinates and update the second marker position.

**`MapSection`**

A custom component that handles displaying the map, placing markers, and updating their positions when dragged.

**`InfoPanel`**

Displays information about the two markers, including their coordinates and the distance between them. It also includes a button to toggle map types.

**`CoordinateInput`**

A component that allows users to input latitude and longitude to move the second marker and search for new coordinates.
## Utilities

- **`locationUtils.ts:`** Contains functions for getting the current location and requesting location permissions.

- **`distanceUtils.ts:`** Contains a function for calculating the distance between two geographical points using the Haversine formula.
## Usage

- **Get Current Location:** Automatically fetches and sets the user's current location on the map.

- **Move Markers:** Tap on the map to move markers.

- **Toggle Map Type:** Cycle through map types (standard, satellite, terrain).

- **Distance Calculation:** Calculates the distance between two markers in kilometers.

- **Search Coordinates:** Enter latitude and longitude to update the second marker's position.


## Acknowledgements

 - [Google Maps API for providing the map and location services.](https://developers.google.com/maps/documentation/android-sdk)
 - [React Native for mobile app development.](https://reactnative.dev/)
