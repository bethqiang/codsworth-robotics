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
          {topProducts.map(bot => (
            <div className="col-md-4" key={bot.id}>
              <Link to={'/products/' + bot.id}>
                <div className="card">
                  <img className="card-image" src={bot.images[0]} />
                  <div className="row">
                    <div className="col-md-8">
                      <h3>{bot.name}</h3>
                    </div>
                    <div className="col-md-4">
                      <h3 className="pull-right">${priceString(bot.price)}</h3>
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
