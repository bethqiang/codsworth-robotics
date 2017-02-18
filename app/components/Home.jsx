import React from 'react';
import { Link } from 'react-router';

const Home = props => {
  const topPicks = ['Trainer Bot', 'Productivity Bot', 'Hug Bot'];
  return (
    <div>
      <img className="home-image" src="/images/home.jpg" />
      <div className="container">
        <div className="center">
          <h1>Our Top Picks</h1>
        </div>
        <div className="row">
          {topPicks.map(bot => (
            <div className="col-md-4" key={bot}>
              <p>{bot}</p>
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

export default Home;
