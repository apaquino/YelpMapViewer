'use strict';

import React, { Component, PropTypes } from 'react-native';

const propTypes = {
  handleOnSubmitEditing: PropTypes.func.isRequired
};

let {
  StyleSheet,
  TextInput
} = React;

class SearchInputBox extends Component {
  render() {
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
};

const styles = StyleSheet.create({
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

SearchInputBox.propTypes = propTypes;

export default SearchInputBox;
