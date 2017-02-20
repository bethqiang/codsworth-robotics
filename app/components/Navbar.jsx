import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';

import { logout } from 'APP/app/reducers/auth';

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
          {props.user && props.user.id ? <li><Link to='/' onClick={props.logout}>Log Out</Link></li> : null}
        </ul>
      </div>
    </nav>
  );
};

/* ----------------- CONTAINER ------------------ */

const mapStateToProps = state => {
  return {
    user: state.auth,
    cart: state.cart
  };
};

const mapDispatchToProps = dispatch => ({
  logout () {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
