import React from 'react';

export const ReviewOutput = props => {
  return (
    <div className="review">
      <h3>{props.review.title}</h3>
      <p>{props.review.text}</p>
    </div>
  );
};
