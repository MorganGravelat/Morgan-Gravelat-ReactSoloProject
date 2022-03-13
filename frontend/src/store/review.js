const LOAD = "reviews/LOAD";
const ADD_ONE = "reviews/ADD_ONE";
const DELETE_ONE = "reviews/DELETE_ONE";
// const GET_ONE = "businesses/GET_ONE"

const load = (review) => ({
  type: LOAD,
  review,
});


const addOne = (business) => ({
  type: ADD_ONE,
  business,
});

const deleteOne = reviewId => ({
    type: DELETE_ONE,
    reviewId,
})

export const DeleteReview = id => async (dispatch) => {
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
    let setState;
  switch (action.type) {
    case LOAD:
      setState = {...state}
      let newReviews = {};
      console.log('ACTION REVIEW',action.review);
      action.review?.forEach((review) => {
        newReviews[review.id] = review;
      });
      setState.allReviews = newReviews;
      return setState;
    case DELETE_ONE:
      setState = {...state};
      let deleteList = [...setState.list];
      let ind;
      deleteList.forEach((business, index) => {
          if (business.id === action.businessId) {
              ind = index;
          }
      })
      delete setState.list[ind];
      return setState;
    default:
      return state;
  }
};

export default reviewReducer;
