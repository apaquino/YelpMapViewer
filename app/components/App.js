'use strict';

import React, { Component } from 'react-native';
import SearchInputBox from './SearchInputBox';
import PinDetailFooter from './PinDetailFooter';
import YelpApi from '../utils/yelpApi';

let {
  StyleSheet,
  View,
  MapView,
  StatusBarIOS,
} = React;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yelpPinSelected: false,
      selectedYelpPin: {},
      yelpResults: [],
      latitude: "unknown",
      longitude:"unknown",
      searched: false
    };
  }

  componentWillMount() {
    StatusBarIOS.setStyle(1);
  }

  _handleCloseFooterButton(){
    this.setState({
      yelpPinSelected: !this.state.yelpPinSelected
    });
  }

  _showFooter() {
    let yelpPinSelected = this.state.yelpPinSelected;
    // Do not show footer if a pin is not selected.
    // This function is called in the component render function
    // Logic is done here to keep render as clean as possible
    if (!yelpPinSelected) {
      return;
    }

    let selectedYelpPin = this.state.selectedYelpPin,
        selectedYelpPinAddress = "";
        selectedYelpPin.addressArr.forEach((element) => {
          selectedYelpPinAddress += element + "\n";
        });
        // remove the last \n from the string
        selectedYelpPinAddress = selectedYelpPinAddress.slice(0, -1);
        // TODO make a util function to turn an array of strings into an string with \n

    return (
              <PinDetailFooter
                 selectedYelpPin={selectedYelpPin}
                 address={selectedYelpPinAddress}
                 handleClose={this._handleCloseFooterButton.bind(this)}
              />
           )
  }

  _getYelpData(e) {
    // NOTE I make variables to hold state data as reference
    //      to not have long arguements in functions and be consistent
    let latitude = this.state.latitude,
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
  }

  _handleOnRegionChangeComplete(region) {
    let searched = this.state.searched;

    if (!searched) {
      this.setState({
        latitude: region.latitude,
        longitude: region.longitude
      });
    }
  }

  _handleOnAnnotationPress(pin) {
    // Do not show footer if you press the pin from where you did your search from
    if (pin.title === "Searched from here" || pin.title === "Search from here" ) {
      return
    }

    var yelpResults = this.state.yelpResults;

    this.setState({
      yelpPinSelected: true,
      selectedYelpPin: yelpResults.find((result) => { return result.name === pin.title})
    });
  }

  _createPins(){
    let pins = [],
        searchLatitude = this.state.latitude,
        searchLongitude = this.state.longitude,
        searched = this.state.searched,
        searchPinTitle = searched ? "Searched from here" : "Search from here",
        yelpResults = this.state.yelpResults;
    // first pin is where you did you search from
    pins.push({
      latitude: searchLatitude,
      longitude: searchLongitude ,
      title: searchPinTitle
    });
    // add pins from search results
    yelpResults.forEach((result) => {
      pins.push({
        latitude: result.latitude,
        longitude: result.longitude ,
        title: result.name});
    });
    return pins
  }

  // TODO add function to UI later to clear pins without doing a re-search
  _clearPins() {
    this.setState({
      searched: false,
      yelpPinSelected: false,
      yelpResults: []
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchInputBox handleOnSubmitEditing={this._getYelpData.bind(this)} />
        <View style={styles.body}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            onRegionChangeComplete={this._handleOnRegionChangeComplete.bind(this)}
            annotations={this._createPins()}
            onAnnotationPress={this._handleOnAnnotationPress.bind(this)}
          />
        </View>
      { this._showFooter() }
      </View>
    );
  }
};

const styles = StyleSheet.create({
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
  map: {
    flex: 1
  }
});

export default App;
