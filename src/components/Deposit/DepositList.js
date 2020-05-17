import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import DepositItem from './DepositItem';

class DestinationList extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    const depositDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      depositDataSource: depositDataSource.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      depositDataSource: this.state.depositDataSource.cloneWithRows(nextProps.deposits)
    })
  }

  renderRow(deposit) {
    return <DepositItem onRefresh={this.props.onRefresh} deposit={deposit} />
  }

  render() {
    const state = this.state
    return (
      <ListView
        dataSource={state.depositDataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    );
  }

}

export default DestinationList;
