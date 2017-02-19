import React from 'react';
import { Link } from 'react-router';
import { priceString } from 'APP/app/utils';

export const ProductCardView = (props) => {
  return (
    <div key={props.product.id} className="card">
      <Link to={`/products/${props.product.id}`}>
        <img className="card-image" src={props.product.images[0]} />
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8">
            <h3>{props.product.name}</h3>
          </div>
          <div className="col-xs-4 col-sm-4 col-md-4">
            <h3 className="pull-right">${priceString(props.product.price)}</h3>
          </div>
        </div>
      </Link>
      <div className="product-card-description-div">
        <p className="product-card-description">{props.product.category.join('/')}</p>
        <p>{props.product.shortDescription}</p>
      </div>
      <div className="product-link-div center row">
        <div className="col-md-6 center">
          <Link to={`/products/${props.product.id}`} className="product-link">See Details</Link>
        </div>
        <div className="col-md-6 center">
          {props.product.inventory > 0
            ? <Link className="product-link" to="#"
                onClick={e => {
                  e.preventDefault();
                  props.addToCart(props.product.id);
                }}>
                  Add to Cart
              </Link>
            : <button className="btn btn-disabled" disabled="true">Out of Stock</button>}
        </div>
      </div>
    </div>
  );
};

