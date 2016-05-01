import React from 'react';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://the-daily-catch.firebaseio.com/')

// Two-Way Binding
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';

// Bind Scope
import autobind from 'autobind-decorator';

// Components
import Header from './Header';
import Fish from './Fish';
import Inventory from './Inventory';
import Order from './Order';

import helpers from '../helpers';

/*
  App
*/

@autobind
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentDidMount() {
    base.syncState(this.props.params.storeId + '/fishes', {
      context: this,
      state: 'fishes'
    });
    var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);
    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
  }

  loadSamples() {
    this.setState({
      fishes: require('../sample-fishes.js')
    });
  }

  addFish(fish) {
    var timestamp = (new Date()).getTime();
    this.state.fishes['fish-' + timestamp] = fish;
    this.setState({ fishes: this.state.fishes });
  }

  removeFish(key) {
    if(confirm("Are you sure you want to remove this fish?")){
      this.state.fishes[key] = null;
      this.setState({ fishes: this.state.fishes });
    }
  }

  addToOrder(key) {
    this.state.order[key] = this.state.order[key] + 1 || 1;
    this.setState({ order: this.state.order });
  }

  removeFromOrder(key) {
    delete this.state.order[key];
    this.setState({ order: this.state.order });
  }

  renderFish(key){
    return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fish">
            {/*{ Object.keys(this.state.fishes).map(this.renderFish) }*/}
            { Object.keys(this.state.fishes).length > 0 ? Object.keys(this.state.fishes).map(this.renderFish) : <li>No Fishes!</li> }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory fishes={this.state.fishes} addFish={this.addFish} removeFish={this.removeFish} loadSamples={this.loadSamples} linkState={this.linkState.bind(this)}/>
      </div>
    )
  }
}

reactMixin.onClass(App, Catalyst.LinkedStateMixin)

export default App;
