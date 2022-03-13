import { csrfFetch } from "./csrf";
const LOAD = "reviews/LOAD";
const ADD_ONE = "reviews/ADD_ONE";
const DELETE_ONE = "reviews/DELETE_ONE";
// const GET_ONE = "businesses/GET_ONE"

const load = (review) => ({
  type: LOAD,
  review,
});


const addOne = (review) => ({
  type: ADD_ONE,
  review,
});

const deleteOne = id => ({
    type: DELETE_ONE,
    id,
})

export const DeleteReview = id => async (dispatch) => {
    const response = await csrfFetch(`/api/review/delete/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
      const id = await response.json();
      dispatch(deleteOne(id));
      return id;
    }
}


export const getReviews = (id) => async (dispatch) => {
  const response = await fetch(`/api/review/${id}`);
  if (response.ok) {
    const review = await response.json();
    dispatch(load(review));
    return review;
  }
};

export const createReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/review/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });
    if (response.ok) {

      const review = await response.json();
      dispatch(addOne(review));
      return review;
    }
};


const initialState = {
  allReviews: {},
};

const reviewReducer = (state = initialState, action) => {
    let setState;
  switch (action.type) {
    case LOAD:
      setState = {...state}
      let newReviews = {};
      action.review?.forEach((review) => {
        newReviews[review.id] = review;
      });
      setState.allReviews = newReviews;
      return setState;
    case DELETE_ONE:
      setState = {...state};
      delete setState.allReviews[action.id]
      return setState;
    case ADD_ONE:
      setState = {...state}
      setState.allReviews[action.review.id] = action.review;
      return setState;
    default:
      return state;
  }
};

export default reviewReducer;
