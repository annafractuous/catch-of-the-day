import React from 'react';
import helpers from '../helpers';

/*
  Fish Menu Item
*/

var Fish = React.createClass({
  onButtonClick: function(event){
    var key = this.props.index;
    this.props.addToOrder(key);
  },
  render: function(){
    var details = this.props.details;
    var isAvailable = details.status === 'available';
    var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name}/>
        <h3 className="fish-name">
          {details.name}
          <span className="price">{helpers.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
      </li>
    )
  },
  propTypes: {
    index: React.PropTypes.string,
    details: React.PropTypes.object,
    addToOrder: React.PropTypes.func
  }
});

export default Fish;
