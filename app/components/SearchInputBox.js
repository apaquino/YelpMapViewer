'use strict';

const React = require('react-native');

var {
  StyleSheet,
  TextInput
} = React;

var SearchInputBox = React.createClass({
  render: function() {
    return (
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
    );
  }
});

var styles = StyleSheet.create({
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
