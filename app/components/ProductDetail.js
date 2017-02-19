import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import ProductReviews from './ProductReviews';

import { addToCart } from 'APP/app/reducers/cart';
import { priceString } from 'APP/app/utils';

const ProductDetail = props => {
  return (
    <div className="container product-detail">
      {props.selectedProduct.id && (
        <div>
          <div className="row">
            <div className="col-md-5">
              <img className="product-image" src={props.selectedProduct.images[0]} />
            </div>
            <div className="col-md-7">
              <div className="product-info">
                <h1>{props.selectedProduct.name}</h1>
                <h3>${priceString(props.selectedProduct.price)}</h3>
                <p>{props.selectedProduct.fullDescription}</p>
                <div className="standalone-link-div center">
                  {props.selectedProduct.inventory > 0
                    ? <Link className="standalone-link" to="#"
                      onClick={e => {
                        e.preventDefault();
                        props.addToCart(props.selectedProduct.id);
                      }}>
                      Add to Cart
                    </Link>
                    : <button className="pull-left btn btn-disabled" disabled="true">Out of Stock</button>}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <ProductReviews />
          </div>
        </div>
      )}
  </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedProduct: state.selectedProduct,
    reviews: state.reviews
  };
};

const mapDispatchToProps = dispatch => ({
  addToCart (productId) {
    dispatch(addToCart(productId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
