import React from 'react';
import autobind from 'autobind-decorator';
import helpers from '../helpers';

/*
  Fish Menu Item
*/

@autobind
class Fish extends React.Component {
  onButtonClick() {
    var key = this.props.index;
    this.props.addToOrder(key);
  }

  render() {
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
  }
}

export default Fish;
