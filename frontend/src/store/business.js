import { csrfFetch } from "./csrf";
const LOAD = "businesses/LOAD";
const ADD_ONE = "businesses/ADD_ONE";
const LOAD_TYPES = "businesses/LOAD_TYPES"
const DELETE_ONE = "businesses/DELETE_ONE";
const SELECT_BUSINESS = "businesses/SELECT_BUSINESS";
const EDIT_ONE = "businesses/EDIT_ONE"
// const GET_ONE = "businesses/GET_ONE"

const load = (list) => ({
  type: LOAD,
  list,
});

const loadTypes = (types) => ({
    type: LOAD_TYPES,
    types,
  });

const editOne = (editBusiness) => ({
  type: EDIT_ONE,
  editBusiness,
});

const addOne = (business) => ({
  type: ADD_ONE,
  business,
});

const deleteOne = businessId => ({
    type: DELETE_ONE,
    businessId,
})

export const selectBusiness = business => ({
    type: SELECT_BUSINESS,
    business,
});

// const getOne = (business) => ({
//     type: GET_ONE,
//     business
// })


// export const getOnePokemon = id => async dispatch => {
//     const response = await fetch (`/api/business/${id}`);

//     if (response.ok) {
//         const business = await response.json();
//         dispatch(getOne(business));
//     }
// }

export const deleteBusiness = id => async (dispatch) => {
    const response = await csrfFetch(`/api/business/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
      const businessId = await response.json();
      dispatch(deleteOne(businessId));
      return;
    }
}


export const getBusinesses = () => async (dispatch) => {
  const response = await fetch(`/api/business`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
    return list;
  }
};

export const getBusinessTypes = (business) => async (dispatch) => {
    const response = await fetch(`/api/type`)
    if (response.ok) {
        const types = await response.json();
        dispatch(loadTypes(types));
        return types;
    }
}

// export const chooseBusiness = id => async dispatch => {
//     const response = await fetch(`/api/songs/${id}`)
//     if (response.ok) {
//         const business = await response.json();
//         dispatch(selectBusiness(business));
//         return business
//     }
// }
export const chooseBusiness = business => async dispatch => {
            dispatch(selectBusiness(business));
    }
export const editBusiness = (business, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/business/edit/${id}`, {
        method: "PUT",
        body: JSON.stringify(business)
    });

    if (response.ok) {
        const editBusiness = await response.json();
        dispatch(editOne(editBusiness));
        return;
    }
}

export const createBusiness = (business) => async (dispatch) => {
  const response = await csrfFetch(`/api/business/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(business),
  });
  if (response.ok) {
    const business = await response.json();
    dispatch(addOne(business));
    return business;
  }
};

const initialState = {
  list: {},
  types: {},
  selectedBusiness: {},
};

const businessReducer = (state = initialState, action) => {
    let setState;
  switch (action.type) {
    case LOAD:
      const allBusinesses = {};
      action.list.forEach((business) => {
        allBusinesses[business.id] = business;
      });
      return {
        ...state,
        list: allBusinesses,
      };
    case LOAD_TYPES:
      return {
        ...state,
        types: action.types,
      };
    case DELETE_ONE:
      setState = {...state};
      delete setState.list[action.businessId];
      return setState;
    case ADD_ONE:
      setState = {...state}
      setState.list[action.business.id] = action.business;
      return setState;
    case SELECT_BUSINESS:
      return {
          ...state,
          currentBusiness: action.business,
      };
    case EDIT_ONE:
        setState = {...state}
        let ele = action.editBusiness
        setState.list[ele.id] = ele
        return setState;
    default:
      return state;
  }
};

export default businessReducer;
