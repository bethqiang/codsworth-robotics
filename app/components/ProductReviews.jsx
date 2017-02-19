import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ReviewOutput } from './ReviewOutput';

export class ProductReviews extends Component {
  constructor () {
    super();
    this.state = {
      currentViewReviews: true
    };

    this.togglePane = this.togglePane.bind(this);
  }

  togglePane (evt) {
    evt.preventDefault();
    this.setState({currentViewReviews: !this.state.currentViewReviews});
  }

  render () {
    if (this.state.currentViewReviews) {
      return (
        <div className="card">
          <h2>User Reviews | <Link to="#" onClick={this.togglePane}>Write a Review</Link></h2>
          {
            (this.props.reviews.length > 0) &&
            (this.props.reviews.map((review, index) => {
              return (
                <ReviewOutput review={review} key={index}/>
              );
            }))
          }
        </div>
      );
    } else {
      return (
        <div className="card">
           <h2><Link to="#" onClick={this.togglePane}>User Reviews</Link> | Write a Review</h2>
          <h3>Write a Review</h3>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    product: state.selectedProduct,
    reviews: state.reviews
  };
};

export default connect(mapStateToProps)(ProductReviews);
