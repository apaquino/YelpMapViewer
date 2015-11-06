'use strict';

import React, { Component, PropTypes } from 'react-native';
import App from './app/components/App';

const propTypes = {
  initialRoute: PropTypes.object
};

let {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

class YelpMapViewer extends Component {
  render() {
    // adding navigator to clean up index and for future features
    return (
      <NavigatorIOS
        style={styles.container}
        navigationBarHidden={true}
        initialRoute={{
          component: App,
          title: 'Yelp Map View'
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

App.propTypes = propTypes;

AppRegistry.registerComponent('YelpMapViewer', () => YelpMapViewer);
