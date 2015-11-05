'use strict';

var React = require('react-native');

var {
  StyleSheet,
  View,
  TextInput
} = React;

var SearchInputBox = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="searchTextInput"
          style={styles.textInput}
          placeholder="  Search for something"
          autoFocus={true}
          autoCorrect={false}
          returnKeyType="search"
          enablesReturnKeyAutomatically={true}
          autoCapitalize="none"
          onSubmitEditing={this.props.handleOnSubmitEditing}
          clearButtonMode='always'
          clearTextOnFocus={true}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#4682b4'
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 10
  }
});

module.exports = SearchInputBox;
