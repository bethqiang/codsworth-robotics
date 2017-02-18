import axios from 'axios';

/* ------------- INITIAL (PRODUCTS - multiple) STATE ------------------- */
// Independent of the selected product

const initialProductsState = {
  all: [],
  top: []
};

/* ------------- ACTION TYPES ------------------- */

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
const RECEIVE_TOP_PRODUCTS = 'RECEIVE_TOP_PRODUCTS';
const SELECT_PRODUCT = 'SELECT_PRODUCT';
const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';

/* ------------- ACTION CREATORS ---------------- */

export const getProducts = products => {
  return { type: RECEIVE_PRODUCTS, products };
};

export const getTopProducts = products => {
  return { type: RECEIVE_TOP_PRODUCTS, products };
};

export const setSelectedProduct = product => {
  return { type: SELECT_PRODUCT, product };
};

export const getReviews = reviews => {
  return { type: RECEIVE_REVIEWS, reviews };
};

// Request all products, top products, and selected product if applicable
export const loadProducts = (id = null) => {
  return dispatch =>
    axios.get('/api/products')
    .then(res => res.data)
    .then(products => {
      dispatch(getProducts(products));
      // Set top products
      const topProducts = products.filter(product => {
        return (product.name === 'Productivity Bot') || (product.name === 'Trainer Bot') || (product.name === 'Wall-E');
      });
      dispatch(getTopProducts(topProducts));
      // If id is provided, the 'selectedProduct' will also be set
      if (id !== null) {
        dispatch(setSelectedProduct(
          products.find(product => {
            return (product.id === (+id));
          })
        ));
      }
    })
    .catch(err => console.error(err));
};

export const loadReviews = (productId) => {
  return dispatch =>
  axios.get(`/api/products/reviews/${productId}`)
  .then(res => res.data)
  .then(reviews => {
    dispatch(getReviews(reviews));
  })
  .catch(err => console.error(err));
};

/* ----------------- REDUCERS -------------------- */

export const productsReducer = (state = initialProductsState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      newState.all = action.products;
      break;
    case RECEIVE_TOP_PRODUCTS:
      newState.top = action.products;
      break;
    default:
      return state;
  }
  return newState;
};

export const selectProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export const reviewsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
};

