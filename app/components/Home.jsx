import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { priceString } from 'APP/app/utils';

const Home = props => {
  const topProducts = props.topProducts;
  return (
    <div>
      <img className="home-image" src="/images/home.jpg" />
      <div className="container">
        <div className="center">
          <h1>Our Top Picks</h1>
        </div>
        <div className="row">
          {topProducts.map(product => (
            <div key={product.id} className="col-md-4">
              <Link to={`/products/${product.id}`}>
                <div className="card">
                  <img className="card-image" src={product.images[0]} />
                  <div className="row">
                    <div className="col-xs-8 col-sm-8 col-md-8">
                      <h3>{product.name}</h3>
                    </div>
                    <div className="col-xs-8 col-sm-4 col-md-4">
                      <h3 className="pull-right">${priceString(product.price)}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="standalone-link-div center">
          <Link to="/products" className="standalone-link">Browse All</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    topProducts: state.products.top
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
