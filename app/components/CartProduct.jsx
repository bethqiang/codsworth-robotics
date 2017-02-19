import React from 'react';
import { Link } from 'react-router';

import { priceString } from 'APP/app/utils';

const CartProduct = props => {
  return (
    <div className="row single-product">
      <div className="col-xs-4">
        <img className="card-image" src={`${props.product.images[0]}`} />
      </div>
      <div className="col-xs-4">
        <Link to={`/products/${props.product.id}`}>
          {props.product.name}
        </Link>
        {props.product.inventory > 0
          ? <p>In Stock</p>
          : <p>Out of Stock</p>}
        <p>Price: ${priceString(props.product.price)}</p>
      </div>
      <div className="col-xs-4 center">
        <form onSubmit={evt => {
          evt.preventDefault();
          props.updateQuantity(
            props.product.id,
            evt.target.quantity.value
          );
        }}>
          <label>Quantity:</label>
          <div className="input-group">
            <input
              name="quantity"
              type="number"
              placeholder={`${props.product.quantity}`}
              value={props.inputVal}
              onChange={props.handleChange} />
            <span>
              <button type="submit" value="update" className="quantity-button"><i className="fa fa-refresh"></i></button>
            </span>
          </div>
        </form>
      </div>
      <div className="remove-from-cart center">
        <button
          onClick={() => props.deleteProduct(props.product.id)}>
            Remove
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
