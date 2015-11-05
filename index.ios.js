'use strict';

var React = require('react-native'),
    App = require('./app/components/App');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

var YelpMapViewer = React.createClass({
  render: function() {
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
