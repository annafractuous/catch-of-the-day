import React from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import autobind from 'autobind-decorator';
import helpers from '../helpers';


/*
  Current Order
*/

@autobind
class Order extends React.Component {
  renderOrder(key) {
    var fish = this.props.fishes[key];
    var count = this.props.order[key];
    var removeButton = <button onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>
    if(!fish) {
      return <li key={key}>Sorry, that fish is no longer available! {removeButton}</li>
    }
    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup component="span" transitionName="count"
          transitionEnterTimeout={250} transitionLeaveTimeout={250}>
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          &nbsp;lbs {fish.name} {removeButton}
        </span>
        <span className="price">{helpers.formatPrice(count * fish.price)}</span>
      </li>
    )
  }

  render() {
    var orderIds = Object.keys(this.props.order);
    var total = orderIds.reduce((prevTotal, key)=>{
      var fish = this.props.fishes[key];
      var count = this.props.order[key];
      var isAvailable = fish && fish.status === 'available';
      if(isAvailable) {
        return prevTotal + (count * parseInt(fish.price) || 0);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2 className="order-title">Your Order</h2>
        <CSSTransitionGroup component="ul" className="order" transitionName="order"
        transitionEnterTimeout={400} transitionLeaveTimeout={480}>
          { orderIds.length > 0 ? orderIds.map(this.renderOrder) : ""}
          <li className="total">
            <strong>Total:</strong>
            {helpers.formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
}

export default Order;
