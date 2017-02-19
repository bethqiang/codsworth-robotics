import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from 'APP/app/reducers/cart';
import { ProductCardView } from './ProductCard';


export const BrowseProducts = (props) => {
  let viewProducts = props.products;  // filtered subset of all products

  // filter based on category
  // search filters can also be added here as an else-if
  if (props.location.query.category !== undefined) {
    viewProducts = viewProducts.filter(product => {
      return (product.category.includes(props.location.query.category));
    });
  }

  // filter based on searchTerm.filterValue text
  if (props.searchTerm !== undefined && props.searchTerm.filterValue !== undefined) {
    viewProducts = viewProducts.filter(product => {
      return (product.name.includes(props.searchTerm.filterValue));
    });
  }

  return (
    <div className="container products">
      <div className="center">
        <h1>All Products</h1>
      </div>
      {viewProducts && viewProducts.map(product => (
        <div className="col-md-4" key={product.id}>
          <ProductCardView key={product.id} product={product} addToCart={props.addToCart}/>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    products: state.products.all,
    searchTerm: state.filtertext
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart (productId) {
      dispatch(addToCart(productId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowseProducts);
