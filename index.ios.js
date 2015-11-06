'use strict';

const React = require('react-native'),
      App = require('./app/components/App');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

var YelpMapViewer = React.createClass({
  render: function() {
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
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('YelpMapViewer', () => YelpMapViewer);
