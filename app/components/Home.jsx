import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

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
              <p>{bot.name}</p>
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
