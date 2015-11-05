'use strict';

var React = require('react-native'),
    SearchInputBox = require('./SearchInputBox'),
    YelpApi = require('../utils/yelpApi');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  MapView,
  StatusBarIOS,
  Image
} = React;

var App = React.createClass({

  getInitialState: function() {
    return {
      yelpPinSelected: false,
      selectedYelpPin: {},
      yelpResults: [],
      latitude: "unknown",
      longitude:"unknown",
      searched: false,
      searchValue: null
    };
  },

  componentWillMount: function() {
    StatusBarIOS.setStyle(1);
  },

  _handleCloseFooterButton: function(){
    this.setState({
      yelpPinSelected: !this.state.yelpPinSelected
    });
  },

  _showFooter: function() {
    var yelpPinSelected = this.state.yelpPinSelected;
    // Do not show footer if a pin is not selected.
    // This function is called in the component render function
    // Logic is done here to keep render as clean as possible
    if (!yelpPinSelected) {
      return;
    }

    var selectedYelpPin = this.state.selectedYelpPin,
        selectedYelpPinAddress = "";
        selectedYelpPin.addressArr.forEach((element) => {
          selectedYelpPinAddress += element + "\n";
        });
        // remove the last \n from the string
        selectedYelpPinAddress = selectedYelpPinAddress.slice(0, -1);
        // TODO make a util function to turn an array of strings into an string with \n

    // TODO break into components.

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
          {selectedYelpPinAddress}
          </Text>
          <Text style={styles.baseText}>
          {selectedYelpPin.phone}
          </Text>
        </View>
        <View style={styles.leftContainer}>
          <Text
            style={styles.closeFooterButton}
            onPress={this._handleCloseFooterButton}>
          X
          </Text>
        </View>
      </View>
    )
  },

  _getYelpData: function(e) {
    // NOTE I make variables to hold state data as preference
    //      to not have long arguements in functions and be consistent
    var latitude = this.state.latitude,
        longitude = this.state.longitude,
        term = e.nativeEvent.text,
        tempYelpResults;
    // TODO make more code into ES 2015 syntax
    YelpApi(latitude, longitude, term)
      .then((data) => {
        tempYelpResults = data.map((result) =>{
          return {
            name: result.name,
            latitude: result.location.coordinate.latitude,
            longitude: result.location.coordinate.longitude,
            imageUrl: result.image_url,
            phone: result.display_phone,
            addressArr: result.location.display_address
          }
        });
      })
      .then(()=> {
        this.setState({
          searched: true,
          yelpResults: tempYelpResults
        })
      });
  },

  _handleOnRegionChangeComplete: function(region) {
    var searched = this.state.searched;

    if (!searched) {
      this.setState({
        latitude: region.latitude,
        longitude: region.longitude
      });
    }
  },

  _handleOnAnnotationPress: function(pin) {
    // Do not show footer if you press the pin from where you did your search from
    if (pin.title === "Searched from here" || pin.title === "Search from here" ) {
      return
    }

    var yelpResults = this.state.yelpResults;

    this.setState({
      yelpPinSelected: true,
      selectedYelpPin: yelpResults.find((result) => { return result.name === pin.title})
    });
  },

  _createPins: function(){
    var pins = [],
        searchLatitude = this.state.latitude,
        searchLongitude = this.state.longitude,
        searched = this.state.searched,
        searchPinTitle = searched ? "Searched from here" : "Search from here",
        yelpResults = this.state.yelpResults;
    // first pin is where you did you search from
    pins.push({latitude: searchLatitude, longitude: searchLongitude , title: searchPinTitle});
    // add pins from search results
    yelpResults.forEach((result) => {
      pins.push({
        latitude: result.latitude,
        longitude: result.longitude ,
        title: result.name});
    });
    return pins
  },

  _clearPins: function() {
    this.setState({
      searched: false,
      yelpPinSelected: false,
      yelpResults: []
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <SearchInputBox handleOnSubmitEditing={this._getYelpData.bind(this)} />
        <View style={styles.body}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            onRegionChangeComplete={this._handleOnRegionChangeComplete}
            annotations={this._createPins()}
            onAnnotationPress={this._handleOnAnnotationPress}
          />
        </View>
      { this._showFooter() }
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#4682b4'
  },
  body: {
    flex: 4,
  },
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
  },
  map: {
    flex: 1
  }
});

module.exports = App;
