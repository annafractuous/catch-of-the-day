import React from 'react';
import AddFishForm from './AddFishForm';

/*
  Inventory Manager
*/

var Inventory = React.createClass({
  renderInventory: function(key){
    var linkState = this.props.linkState;
    return (
      <form key={key} className="fish-edit" onSubmit={this.createFish}>
        <input type="text" valueLink={linkState('fishes.' + key + '.name')}/>
        <input type="text" valueLink={linkState('fishes.' + key + '.price')}/>
        <select valueLink={linkState('fishes.' + key + '.status')}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" valueLink={linkState('fishes.' + key + '.desc')}></textarea>
        <input type="text" valueLink={linkState('fishes.' + key + '.image')}/>
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
      </form>
    )
  },
  render: function(){
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm {...this.props}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  },
  propTypes: {
    fishes: React.PropTypes.object.isRequired,
    addFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    linkState: React.PropTypes.func.isRequired
  }
});

export default Inventory;
