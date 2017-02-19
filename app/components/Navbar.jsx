import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { changeSearchValue, submitSearch } from '../reducers/search';

const Navbar = props => {
  const calcCartQuantity = () => {
    let total = 0;
    for (let i = 0; i < props.cart.products.length; i++) {
      total += props.cart.products[i].quantity;
    }
    return total;
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="pull-left brand">
          <IndexLink to="/">Codsworth Robotics</IndexLink>
        </div>
        <ul>
          <li><Link to="/products">Shop</Link></li>
          <li><Link to={props.user && props.user.id ? '/orders' : '/login'}>Account</Link></li>
          <li><Link to="/cart">Cart {props.cart.products.length > 0 ? `(${calcCartQuantity()})` : null}</Link></li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth,
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange (event) {
    dispatch(changeSearchValue(event.target.value));
  },
  handleSubmit (event) {
    event.preventDefault();
    dispatch(submitSearch());
    browserHistory.push(`/products`);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
