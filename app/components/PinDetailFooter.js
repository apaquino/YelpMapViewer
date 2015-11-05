'use strict';

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} = React;

var PinDetailFooter = React.createClass({

  render: function() {
    var selectedYelpPin = this.props.selectedYelpPin;

    return (
      <View style={styles.footer}>
        <Image
          source={{uri: selectedYelpPin.imageUrl}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>
          {selectedYelpPin.name}
          </Text>
          <Text style={styles.baseText}>
          {this.props.address}
          </Text>
          <Text style={styles.baseText}>
          {selectedYelpPin.phone}
          </Text>
        </View>
        <View style={styles.leftContainer}>
          <Text
            style={styles.closeFooterButton}
            onPress={this.props.handleClose}>
          X
          </Text>
        </View>
      </View>
    )
  }
});

var styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4682b4',

  },
  baseText: {
    fontFamily: 'Cochin',
  },
  title: {
    fontFamily: 'Cochin',
    fontSize: 20
  },
  thumbnail: {
    width: 88,
    height: 88,
    marginLeft: 10,
    marginRight:10
  },
  rightContainer: {
    flex: 9,
  },
  leftContainer: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "flex-end",
    marginTop: 10,
    marginRight: 10
  },
  closeFooterButton:{
    fontWeight: "bold",
    color: "white"
  }
});

module.exports = PinDetailFooter;
