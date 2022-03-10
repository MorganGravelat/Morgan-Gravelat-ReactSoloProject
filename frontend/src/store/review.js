const LOAD = "businesses/LOAD";
const ADD_ONE = "businesses/ADD_ONE";
const DELETE_ONE = "businesses/DELETE_ONE";
const EDIT_ONE = "businesses/EDIT_ONE"
// const GET_ONE = "businesses/GET_ONE"

const load = (list) => ({
  type: LOAD,
  list,
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
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
};

export const editReview = (review) => async (dispatch) => {
    const response = await fetch(`/api/business/edit`);
    dispatch(editOne(business));
    return business;
}

export const createReview = (review) => async (dispatch) => {
  const response = await fetch(`/api/review/create`, {
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
  list: [],
};

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allReviews = {};
      action.list.forEach((review) => {
        allReviews[review.id] = review;
      });

      return {
        ...state,
        list: action.list,
      };
    case DELETE_ONE:
      delete state.review[action.reviewId];
      return state;
    case ADD_ONE:
      const newReview = {
          ...state,
          [action.review.id]: action.review,
      };
      const reviewList = newReview.list.map(id => newReview[id]);
      reviewList.push(action.review);
      return newReview
    default:
      return state;
  }
};

export default businessReducer;
