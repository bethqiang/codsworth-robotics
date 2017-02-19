import React from 'react';
import { connect } from 'react-redux';

import CartProduct from 'APP/app/components/CartProduct';
import { deleteFromCart, updateQuantity } from 'APP/app/reducers/cart';
import { checkout } from 'APP/app/reducers/orders';
import { priceString } from 'APP/app/utils';

const Cart = props => {
  return (
    <div className="container cart">
      <div className="center">
        <h1>Your Cart</h1>
      </div>
      <div className="card">
        {props.cart.products.map(product => (
          <CartProduct key={product.id}
            product={product}
            updateQuantity={props.updateQuantity}
            deleteProduct={props.deleteProduct} />
        ))}
      </div>
      <div className="card order-total center">
        <h2>Order Total: ${priceString(props.cart.total)}</h2>
      </div>
      <div className="center">
        <h1>Your Information</h1>
      </div>
      <div className="card">
        <form onSubmit={evt => {
          evt.preventDefault();
          props.checkout(
            evt.target.email.value,
            evt.target.shippingAddress.value
          );
        }}>
          <div className="checkout-information">
            <label htmlFor="email">Preferred Email:</label>
            <input name="email" type="email" placeholder="example@example.com" />
          </div>
          <div className="checkout-information">
            <label htmlFor="address">Shipping Address:</label>
            <input name="shippingAddress" type="address" placeholder="1234 Example Lane, Candyland, NY 10000" />
          </div>
          <button className="checkout-button" type="submit">Checkout</button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  deleteProduct (productId) {
    dispatch(deleteFromCart(productId));
  },
  checkout (email, shippingAddress) {
    dispatch(checkout(email, shippingAddress));
  },
  updateQuantity (productId, quantity) {
    dispatch(updateQuantity(productId, quantity));
  }
});

// not sure we need the IntermediateCartContainer...

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
