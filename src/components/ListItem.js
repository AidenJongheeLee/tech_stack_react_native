import React, { Component } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, View, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription() {
    const { library, expanded } = this.props;
    if (expanded) {
      return (
        <CardSection>
          <DescriptionText>{library.description}</DescriptionText>
        </CardSection>
      );
    }
  }

  render() {
    const { id, title } = this.props.library;

    return (
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection>
            <LibraryTitle>{title}</LibraryTitle>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const LibraryTitle = styled.Text`
  font-size: 18px;
  padding-left: 15px;
`;

const DescriptionText = styled.Text`
  flex: 1;
`;

const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return {
    expanded
  };
};

export default connect(mapStateToProps, actions)(ListItem);
