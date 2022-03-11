const LOAD = "reviews/LOAD";
const ADD_ONE = "reviews/ADD_ONE";
const DELETE_ONE = "reviews/DELETE_ONE";
const EDIT_ONE = "reviews/EDIT_ONE"
// const GET_ONE = "businesses/GET_ONE"

const load = (review) => ({
  type: LOAD,
  review,
});

const editOne = (list) => ({
  type: EDIT_ONE,
  list,
});

const addOne = (business) => ({
  type: ADD_ONE,
  business,
});

const deleteOne = businessId => ({
    type: DELETE_ONE,
    businessId,
})

export const deleteReview = id => async (dispatch) => {
    const response = await fetch(`/api/review/${id}`, {
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

// export const editReview = (review) => async (dispatch) => {
//     const response = await fetch(`/api/business/edit`);
//     dispatch(editOne(business));
//     return business;
// }

// export const createReview = (review) => async (dispatch) => {
//   const response = await fetch(`/api/review/create`, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(review),
//   });
//   if (response.ok) {
//     const review = await response.json();
//     dispatch(addOne(review));
//     return review;
//   }
};

const initialState = {
  allReviews: [],
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allReviews = [];
      console.log('ACTION REVIEW',action.review);
      action.review?.forEach((review) => {
        allReviews[review.id] = review;
      });
      return {
        ...state,
        allReviews: allReviews,
      };
    default:
      return state;
  }
};

export default reviewReducer;
