import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { priceString } from 'APP/app/utils.js';
import { getOrderHistory } from 'APP/app/reducers/orders';
import { addToCart } from 'APP/app/reducers/cart';

export class Orders extends Component {
  componentDidMount () {
    this.props.getOrderHistory();
  }
  formatDate (date) {
    return moment(date).format('MMMM D, YYYY').toString();
  }
  capitalizeOrderStatus (status) {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
  render () {
    return (
      <div className="container orders">
        <div className="center">
          <h1>Your Order History</h1>
        </div>
        {this.props.orderHistory && this.props.orderHistory.map(order => (
          <div key={order.orderID} className="single-order">
            <div className="order-header">
              <div className="row">
                <div className="col-xs-8">
                  <h5>Order ID: {order.orderID}</h5>
                </div>
                <div className="col-xs-4">
                  <h5 className="pull-right">Placed: {this.formatDate(order.orderDate)}</h5>
                </div>
              </div>
            </div>
            <div className="order-subheader">
              <div className="row">
                <div className="col-xs-3">
                  <p>Total: ${priceString(order.totalPrice)}</p>
                </div>
                <div className="col-xs-3">
                  <p>Status: {this.capitalizeOrderStatus(order.status)}</p>
                </div>
                <div className="col-xs-6">
                  <p className="pull-right">Ship To: {order.shippingAddress}</p>
                </div>
              </div>
            </div>
            <div className="product-details">
              <h3>Details</h3>
              {order.products.map(product => (
                <div key={product.id} className="row single-product">
                  <div className="col-xs-4">
                    <img src={`${product.images[0]}`} />
                  </div>
                  <div className="col-xs-4 order-product-name">
                    <Link to={`/products/${product.id}`}>
                      <p>{product.name}</p>
                    </Link>
                    <button
                      onClick={() => this.props.addToCart(product.id)}>
                        Buy It Again
                    </button>
                  </div>
                  <div className="col-xs-4">
                    <p>Quantity: {product.orderproducts.quantity}</p>
                    <p>Price: ${priceString(product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

/* ----------------- CONTAINER ------------------ */

const mapStateToProps = state => ({
  orderHistory: state.orders.orderHistory
});

const mapDispatchToProps = dispatch => ({
  getOrderHistory () {
    dispatch(getOrderHistory());
  },
  addToCart (productId) {
    dispatch(addToCart(productId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
