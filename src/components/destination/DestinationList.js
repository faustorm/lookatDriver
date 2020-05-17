import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import DestinationItem from './DestinationItem';

class DestinationList extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    const destinationDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      destinationDataSource: destinationDataSource.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      destinationDataSource: this.state.destinationDataSource.cloneWithRows(nextProps.destinations)
    })
  }

  renderRow(destination) {
    return <DestinationItem onRefresh={this.props.onRefresh} destination={destination} navigation={this.props.navigation}/>
  }

  render() {
    const state = this.state
    return (
      <ListView
        dataSource={state.destinationDataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    );
  }

}

export default DestinationList;
