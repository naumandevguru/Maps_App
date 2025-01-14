import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/home/Home';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // Define dynamic background style based on the color scheme.
  const backgroundStyle: ViewStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        hidden
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} // Sets text/icon color based on theme.
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* Render the Home screen */}
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
