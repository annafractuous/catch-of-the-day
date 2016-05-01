import React from 'react';
import { Navigation } from 'react-router';
import { browserHistory } from 'react-router'
import autobind from 'autobind-decorator';
import helpers from '../helpers';

/*
  Select A Store
*/

@autobind
class StorePicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    var storeId = this.refs.storeId.value;
    // this.history.pushState(null, '/store/' + storeId);
    browserHistory.push('/store/' + storeId);
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required />
        <input type="Submit"/>
      </form>
    )
  }
}

export default StorePicker;
